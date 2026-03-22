import React, { useEffect, useState } from "react";
import api from "../services/api";

const SavedCardsPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getCards();
        setCards(data);
      } catch (err) {
        setError("Cannot fetch saved cards");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="container py-5">Loading...</div>;
  if (error) return <div className="container py-5 alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h3>Saved ID Cards</h3>
      <div className="row">
        {cards.length === 0 && <div className="col-12">No saved cards yet.</div>}
        {cards.map((card, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="card mb-3">
              <div className="card-body">
                <h5>{card.fullName}</h5>
                <p className="mb-1">ID: {card.idNumber}</p>
                <p className="mb-1">Org: {card.organization}</p>
                {card.profileUrl && <img src={card.profileUrl} alt="profile" className="img-fluid rounded mb-2" />}
                {card.logoUrl && <img src={card.logoUrl} alt="logo" className="img-fluid rounded mb-2" style={{ maxHeight: 60 }} />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedCardsPage;
