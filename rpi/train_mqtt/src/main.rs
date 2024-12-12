use aws_iot_device_sdk_rust::{sync_client::event_loop_listener, AWSIoTClient, AWSIoTSettings, Packet, QoS};
use base64::prelude::*;
use std::error::Error;
use std::thread;
use std::time::Duration;
use std::sync::Arc;
use std::sync::atomic::{AtomicU8, Ordering};
use std::env;

const T1C1_IP: &str = "192.168.137.245";
const T1C2_IP: &str = "192.168.137.223";
const T2C1_IP: &str = "192.168.137.51";
const T2C2_IP: &str = "192.168.137.119";

fn main() -> Result<(), Box<dyn Error>> {
    let mut TRAIN_ID = "";
    let mut C1_IP = "";
    let mut C2_IP = "";
    match env::args().last().as_deref() {
        Some("1") => {
            println!("This is Train 1");
            TRAIN_ID = "train1";
            C1_IP = T1C1_IP;
            C2_IP = T1C2_IP;
        },
        Some("2") => {
            println!("This is Train 2");
            TRAIN_ID = "train2";
            C1_IP = T2C1_IP;
            C2_IP = T2C2_IP;
        },
        Some(v) => {
            println!("Invalid Argument: {v}");
            return Ok(());
        }
        None => {
            println!("No Arguments!");
            return Ok(());
        }
    };

    let start = Arc::new(AtomicU8::new(0));
    let c1_cv_count = Arc::new(AtomicU8::new(0));
    let c2_cv_count = Arc::new(AtomicU8::new(0));

    let c1_cv_count_w = c1_cv_count.clone();
    let c2_cv_count_w = c2_cv_count.clone();

    let start = Arc::new(AtomicU8::new(0));
    let start_w = start.clone();

    let rand_id = rand::random::<u64>();
    dbg!(rand_id);
    let aws_settings = AWSIoTSettings::new(
        format!("{}-{}",rand_id,TRAIN_ID).to_owned(),
        "AmazonRootCA1.pem".to_owned(),
        "device-certificate.pem.crt".to_owned(),
        "private.pem.key".to_owned(),
        "a2l6s1mki54p61-ats.iot.ap-southeast-1.amazonaws.com".to_owned(),
        None,
    );

    let (mut iot_core_client, event_loop) = AWSIoTClient::new(aws_settings)?;

    std::thread::spawn(move || event_loop_listener(event_loop));

    iot_core_client
        .subscribe(format!("video/{}/led_count1", TRAIN_ID).to_string(), QoS::AtMostOnce)
        .unwrap();

    iot_core_client
        .subscribe(format!("video/{}/led_count2", TRAIN_ID).to_string(), QoS::AtMostOnce)
        .unwrap();

    iot_core_client
        .subscribe(format!("pub/{}/init", TRAIN_ID).to_string(), QoS::AtMostOnce)
        .unwrap();

    iot_core_client
        .subscribe(format!("pub/{}/simulate", TRAIN_ID).to_string(), QoS::AtMostOnce)
        .unwrap();


    let mut receiver1 = iot_core_client.get_receiver();

    let mut c1_init = 0;
    let mut c2_init = 0;

    if TRAIN_ID == "train1" {
        c1_init = 1;
        c2_init = 2;
    }

    if TRAIN_ID == "train2" {
        c1_init = 3;
        c2_init = 4;
    }

    minreq::get(format!("http://{}/setleds?d={}", C1_IP, c1_init)).send();
    minreq::get(format!("http://{}/setleds?d={}", C2_IP, c2_init)).send();

    let recv1_thread = std::thread::spawn(move || loop {
        if let Ok(event) = receiver1.blocking_recv() {
            match event {
                Packet::Publish(p) => {
                    println!("Received message {:?} on topic: {}", p.payload, p.topic);
                    if p.topic == format!("pub/{}/simulate", TRAIN_ID) && p.payload == "start" {
                        dbg!("TRIGGER START");
                        start.fetch_add(1, Ordering::Relaxed);
                    }

                    if p.topic == format!("pub/{}/init", TRAIN_ID) {
                        dbg!("INIT");
                        dbg!(&p.payload);
                        minreq::get(format!("http://{}/setleds?d={}", C1_IP, std::str::from_utf8(&p.payload[0..1]).unwrap())).send();
                        minreq::get(format!("http://{}/setleds?d={}", C2_IP, std::str::from_utf8(&p.payload[1..2]).unwrap())).send();
                    }

                    if p.topic == format!("video/{}/led_count1", TRAIN_ID) {
                        c1_cv_count_w.store(p.payload[0] - '0' as u8, Ordering::Relaxed);
                    }

                    if p.topic == format!("video/{}/led_count2", TRAIN_ID) {
                        c2_cv_count_w.store(p.payload[0] - '0' as u8, Ordering::Relaxed);
                    }

                },
                _ => println!("Got event on receiver1: {:?}", event),
            }
        }
    });

    let pub1_thread = std::thread::spawn(move || loop {
        dbg!("pub1");
        let request = minreq::get(format!("http://{}/camera", C1_IP));
        let request2 = minreq::get(format!("http://{}/camera", C2_IP));
        let b64_str = BASE64_STANDARD.encode(request.send().unwrap().as_bytes());
        let b64_str_2 = BASE64_STANDARD.encode(request2.send().unwrap().as_bytes());
        dbg!(&b64_str[0..8]);
        dbg!(&b64_str_2[0..8]);

        iot_core_client.publish(format!("video/frames/{}/car1", TRAIN_ID).to_string(), QoS::AtMostOnce, b64_str).unwrap();
        iot_core_client.publish(format!("video/frames/{}/car2", TRAIN_ID).to_string(), QoS::AtMostOnce, b64_str_2).unwrap();

        if start_w.load(Ordering::Relaxed) == 1  {
            start_w.store(0,Ordering::Relaxed);
            let mut c1_count = c1_cv_count.load(Ordering::Relaxed);
            let mut c2_count = c2_cv_count.load(Ordering::Relaxed);
            while (c1_count as i16 - c2_count as i16).abs() > 1 {
                if c1_count > c2_count {
                    c1_count -= 1;
                    c2_count += 1;
                } else {
                    c1_count += 1;
                    c2_count -= 1;
                }
                minreq::get(format!("http://{}/setleds?d={}", C1_IP, c1_count.to_string())).send();
                minreq::get(format!("http://{}/setleds?d={}", C2_IP, c2_count.to_string())).send();
                let request = minreq::get(format!("http://{}/camera", C1_IP));
                let request2 = minreq::get(format!("http://{}/camera", C2_IP));
                let b64_str = BASE64_STANDARD.encode(request.send().unwrap().as_bytes());
                let b64_str_2 = BASE64_STANDARD.encode(request2.send().unwrap().as_bytes());
                iot_core_client.publish(format!("video/frames/{}/car1", TRAIN_ID).to_string(), QoS::AtMostOnce, b64_str).unwrap();
                iot_core_client.publish(format!("video/frames/{}/car2", TRAIN_ID).to_string(), QoS::AtMostOnce, b64_str_2).unwrap();
                thread::sleep(Duration::new(3,0));
            }
            iot_core_client.publish(format!("pub/{}/simulate", TRAIN_ID).to_string(), QoS::AtMostOnce, "stop").unwrap();
        }

        thread::sleep(Duration::new(1,0));
    });

    recv1_thread.join().unwrap();
    pub1_thread.join().unwrap();

    Ok(())
}
