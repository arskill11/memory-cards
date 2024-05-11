import './styles.css';

const AboutGame: React.FC = () => {
  return (
    <div className="aboutGame">
      <h2 className="aboutGame--header">How to play?</h2>
      <p className="aboutGame--text">
        Welcome to the Memory Card Game! In this game, you will be challenged to
        test and improve your memory skills. The objective is simple: you need
        to find and choose all the cards without picking the same card more than
        once.
      </p>
    </div>
  );
};

export default AboutGame;
