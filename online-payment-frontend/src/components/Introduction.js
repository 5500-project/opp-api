import React from "react";

function Introduction() {
  return (
    <section className="introduction">
      {/* Introduction boxes */}
      <div className="intro-container">
        <div className="intro-box">
          <h2>Left Introduction Box</h2>
          <p>This is the content of the left introduction box.</p>
        </div>

        <div className="intro-box">
          <h2>Right Introduction Box</h2>
          <p>This is the content of the right introduction box.</p>
        </div>
      </div>
    </section>
  );
}

export default Introduction;
