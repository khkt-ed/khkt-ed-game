import './Quiz.css';

const Quiz = props => {
  return (
    <div className="quiz-container">
      <h3 className="question-number" style={{ fontSize: (1.5 * props.scale).toString() + "rem" }}>{"Question " + props.id}</h3>
      <div className="question" style={{ fontSize: (1.35 * props.todayQuizzes[props.id - 1].fontSize * props.scale).toString() + "rem" }}>
        {props.todayQuizzes[props.id - 1].question}
      </div>
      <div className="options">
        {props.todayQuizzes[props.id - 1].choices.map((e, i) => {
          let className = "options";

          if (props.todayQuizzes[props.id - 1].selected !== -1) {
            if (i === props.todayQuizzes[props.id - 1].selected) {
              if (i === props.todayQuizzes[props.id - 1].answer) {
                className += " correct";
              }
              else {
                className += " wrong";
              }
            }
            else if (i === props.todayQuizzes[props.id - 1].answer) {
              className += " correct";
            }
          }

          return (
            <div key={e} className={className} style={{ fontSize: (1.2 * props.scale).toString() + "rem" }}
              onClick={(event) => {
                if (props.todayQuizzes[props.id - 1].selected === -1) {
                  event.currentTarget.classList.add(i === props.todayQuizzes[props.id - 1].answer ? "correct" : "wrong");
                  
                  let lmao = props.todayQuizzes.slice();
                  let lmao2 = props.quizzes.slice();
                  let idx = props.quizzes.map(e => JSON.stringify(e)).indexOf(JSON.stringify(lmao[props.id - 1]));
                  lmao[props.id - 1].selected = i;
                  lmao2[idx].selected = i;
                  props.setTodayQuizzes(lmao);
                  props.setQuizzes(lmao2);

                  if (i !== props.todayQuizzes[props.id - 1].answer) {
                    event.currentTarget.parentNode.childNodes[props.todayQuizzes[props.id - 1].answer].classList.add("correct");
                    // CANCER
                  }
                }
              }}>
              {e}
              {props.todayQuizzes[props.id - 1].selected !== -1 && i === props.todayQuizzes[props.id - 1].answer ?
                <a
                  className="info"
                  style={{
                    position:"absolute",
                    right: 20 * props.scale, width: "1rem",
                    height: "1rem",
                    backgroundColor: "transparent",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: (2 * props.scale).toString() + "rem",
                    fontFamily: "sans-serif",
                    textDecoration: "none"
                  }}
                  href={props.todayQuizzes[props.id - 1].href}
                  target="_blank"
                >ⓘ</a>
              : ""}
              {props.todayQuizzes[props.id - 1].selected !== -1 && i === props.todayQuizzes[props.id - 1].answer ?
                <a
                  className="info"
                  style={{
                    position:"absolute",
                    right: 70 * props.scale, width: "1rem",
                    height: "1rem",
                    backgroundColor: "transparent",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: (2 * props.scale).toString() + "rem",
                    fontFamily: "sans-serif",
                    textDecoration: "none"
                  }}
                  onClick={() => {
                    let lmao = props.todayQuizzes.slice();
                    let lmao2 = props.quizzes.slice();
                    let idx = props.quizzes.map(e => JSON.stringify(e)).indexOf(JSON.stringify(lmao[props.id - 1]));
                    lmao[props.id - 1].saved = !lmao[props.id - 1].saved;

                    if (idx > -1) {
                      lmao2[idx].saved = !lmao2[idx].saved;
                    }
                    
                    props.setTodayQuizzes(lmao);
                    props.setQuizzes(lmao2);
                  }}
                >
                  {props.todayQuizzes[props.id - 1].saved ? "✓" : "☆"}
                </a>
              : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;