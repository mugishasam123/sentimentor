const submitReview = (e) => {
    e.preventDefault();
    const review = document.getElementById("review").value;
    const options = {
      method: "POST",
      body: JSON.stringify({ review }),
      headers: new Headers({ "Content-Type": "application/json" }),
    };
  
    const emojiSection = document.getElementById("emojiSection");
    const title = document.getElementById("title");
    const outline = document.querySelector(":focus");
    const resultSection = document.getElementById("resultSection");
  
    fetch("/api/nlp/s-analyzer", options)
      .then((res) => res.json())
      .then(({ analysis }) => {
        if (analysis < 0) {
          resultSection.innerHTML="this express negative review";
          resultSection.style.color = "red";
          emojiSection.innerHTML =
            '<img src="https://img.icons8.com/color/96/000000/angry.png">';
          title.style.color = "red";
          outline.style.borderColor = "red";
        }
        if (analysis === 0) {
          resultSection.innerHTML="this express neutral review";
          resultSection.style.color = "#00367c";
          emojiSection.innerHTML =
            '<img src="https://img.icons8.com/officel/80/000000/neutral-emoticon.png">';
          title.style.color = "#00367c";
          outline.style.borderColor = "#00367c";
        }
        if (analysis > 0) {
          resultSection.innerHTML="this express positive review";
          resultSection.style.color = "green";
          emojiSection.innerHTML =
            '<img src="https://img.icons8.com/color/96/000000/happy.png">';
          title.style.color = "green";
          outline.style.borderColor = "green";
        }
      })
      .catch((err) => {
        emojiSection.innerHTML = "There was an error processing your request!";
      });
  };
  
  document.getElementById("review").addEventListener("keyup", submitReview);
  document.getElementById("reviewForm").addEventListener("submit", submitReview);
  