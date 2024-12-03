import './seats.css';

function Seats({ color='gray' }) {
    return <div className={`seat ${color}`} />;
}

export default Seats;
