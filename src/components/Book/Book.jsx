import './Book.scss'
import { useEffect, useState } from 'react';
import Quiz from '../Quiz/Quiz';
import Fact from '../Fact/Fact';
import delay from 'delay';

const Book = props => {
  const [currentPage, setCurrentPage] = useState(1);
  const [clickCooldown, setClickCooldown] = useState(false);

  function toggleClass(e, toggleClassName) {
    if(e.className.includes(toggleClassName)) {
      e.classList.remove(toggleClassName);
    } else {
      e.classList.add(toggleClassName);
    }
  }

  function movePage(e, page) {
    if (!clickCooldown) {
      setClickCooldown(true);
      setTimeout(() => {
        setClickCooldown(false);
      }, 1000);
      if (!e.target.className.includes("options") && !e.target.className.includes("sad") && e.target.className !== "info") {
        if (page == currentPage) {
          setCurrentPage(currentPage + 2);
          toggleClass(e.currentTarget, "left-side");
          toggleClass(e.currentTarget.nextElementSibling, "left-side");
          
        }
        else if (page = currentPage - 1) {
          setCurrentPage(currentPage - 2);
          toggleClass(e.currentTarget, "left-side");
          toggleClass(e.currentTarget.previousElementSibling, "left-side");
        }
      }
    }
  }

  function movePage2(e, lmao) {
    if (lmao) {
      setCurrentPage(currentPage + 2);
      toggleClass(e, "left-side");
      toggleClass(e.nextElementSibling, "left-side");
      
    }
    else {
      setCurrentPage(currentPage - 2);
      toggleClass(e, "left-side");
      toggleClass(e.previousElementSibling, "left-side");
    }
  }

  return (
    <div className="book">
      <div className="page cover-front" onClick={event => {
        if (!clickCooldown) {
          props.setOpen(true);
          movePage(event, 1);
        }
      }}>
      </div>
      <div className="page cover-front" onClick={event => {
        if (!clickCooldown) {
          props.setOpen(false);
          movePage(event, 2);
        }
      }} />
      <div className="page" onClick={event => { movePage(event, 3); }}>
        <button className="sad" style={{ top: "40%", fontSize: (2 * props.scale).toString() + "rem" }} onClick={async event => {
          const temp = event.currentTarget.parentNode;
          movePage2(temp, true);
          await delay(200);
          movePage2(temp.parentNode.childNodes[4], true);
          setCurrentPage(7);
        }}>
          Facts.................1
        </button>
        <button className="sad" style={{ top: "60%", fontSize: (2 * props.scale).toString() + "rem" }} onClick={async event => {
          const temp = event.currentTarget.parentNode;
          movePage2(temp, true);
          await delay(200);
          movePage2(temp.parentNode.childNodes[4], true);
          await delay(200);
          movePage2(temp.parentNode.childNodes[6], true);
          await delay(200);
          movePage2(temp.parentNode.childNodes[8], true);

          setCurrentPage(11);
        }}>
          Quizzes.................49
        </button>
      </div>
      <div className="page" onClick={event => { movePage(event, 4); }}>
      </div>
      <div className="page" onClick={event => { movePage(event, 5); }}>
        <div className="bruhh" style={{ fontSize: (2.5 * props.scale).toString() + "rem" }}>Facts</div>
      </div>
      <div className="page" onClick={event => { movePage(event, 6); }}>
        {props.todayFacts.length === 0 ? <span style={{ fontSize: (1.5 * props.scale).toString() + "rem" }}>Nothing to show here! You've read all the facts!</span> : ""}
        {props.todayFacts.length > 0 ? <Fact scale={props.scale} facts={props.facts} setFacts={props.setFacts} todayFacts={props.todayFacts} setTodayFacts={props.setTodayFacts} id={1} /> : ""}
        {props.todayFacts.length > 1 ? <Fact scale={props.scale} facts={props.facts} setFacts={props.setFacts} todayFacts={props.todayFacts} setTodayFacts={props.setTodayFacts} id={2} /> : ""}
      </div>
      <div className="page" onClick={event => { movePage(event, 7); }}>
        {props.todayFacts.length > 2 ? <Fact scale={props.scale} facts={props.facts} setFacts={props.setFacts} todayFacts={props.todayFacts} setTodayFacts={props.setTodayFacts} id={3} /> : ""}
        {props.todayFacts.length > 3 ? <Fact scale={props.scale} facts={props.facts} setFacts={props.setFacts} todayFacts={props.todayFacts} setTodayFacts={props.setTodayFacts} id={4} /> : ""}
      </div>
      <div className="page" onClick={event => { movePage(event, 8); }}></div>
      <div className="page" onClick={event => { movePage(event, 9); }}>
        <div className="bruhh" style={{ fontSize: (2.5 * props.scale).toString() + "rem" }}>Quizzes</div>
      </div>
      <div className="page" onClick={event => { movePage(event, 10); }}>
        {props.todayQuizzes.length === 0 ? <span style={{ fontSize: (1.5 * props.scale).toString() + "rem" }}>Nothing to show here! You've done all the quizzes!</span> : ""}
        {props.todayQuizzes.length > 0 ? <Quiz scale={props.scale} quizzes={props.quizzes} setQuizzes={props.setQuizzes} todayQuizzes={props.todayQuizzes} setTodayQuizzes={props.setTodayQuizzes} id={1} /> : ""}
        {props.todayQuizzes.length > 1 ? <Quiz scale={props.scale} quizzes={props.quizzes} setQuizzes={props.setQuizzes} todayQuizzes={props.todayQuizzes} setTodayQuizzes={props.setTodayQuizzes} id={2} /> : ""}
      </div>
      <div className="page">
        {props.todayQuizzes.length > 2 ? <Quiz scale={props.scale} quizzes={props.quizzes} setQuizzes={props.setQuizzes} todayQuizzes={props.todayQuizzes} setTodayQuizzes={props.setTodayQuizzes} id={3} /> : ""}
        {props.todayQuizzes.length > 3 ? <Quiz scale={props.scale} quizzes={props.quizzes} setQuizzes={props.setQuizzes} todayQuizzes={props.todayQuizzes} setTodayQuizzes={props.setTodayQuizzes} id={4} /> : ""}
      </div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
      <div className="page"></div>
    </div>
  );
};

export default Book;