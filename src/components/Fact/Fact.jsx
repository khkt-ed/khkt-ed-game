import "./Fact.css"

const Fact = props => {
  return (
    <div className="fact-container">
      <h3 className="fact-number" style={{ fontSize: (1.5 * props.scale).toString() + "rem" }}>{"Fact " + props.id}</h3>
      <div className="statement" style={{ fontSize: (props.todayFacts[props.id - 1].fontSize * props.scale).toString() + "rem" }}>
        {props.todayFacts[props.id - 1].statement}
      </div>
      <div className="xd" style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#ccc",
        borderRadius: "5px"
      }}>
        <a
          className="info"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: (2 * props.scale).toString() + "rem",
            textDecoration: "none",
            fontFamily: "sans-serif"
          }}
          onClick={() => {
            let lmao = JSON.parse(JSON.stringify(props.todayFacts));
            let lmao2 = JSON.parse(JSON.stringify(props.facts));
            let idx = props.facts.map(e => JSON.stringify(e)).indexOf(JSON.stringify(lmao[props.id - 1]));
            lmao[props.id - 1].saved = !lmao[props.id - 1].saved;
            
            if (idx > -1) {
              lmao2[idx].saved = !lmao2[idx].saved;
            }
            console.log(lmao[props.id - 1].saved);
            
            props.setTodayFacts(lmao);
            props.setFacts(lmao2);
          }}
        >
          {props.todayFacts[props.id - 1].saved ? "✓" : "☆"}
        </a>
        <a
          className="info"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: (2 * props.scale).toString() + "rem",
            textDecoration: "none",
            fontFamily: "sans-serif"
          }}
          href={props.todayFacts[props.id - 1].href}
          target="_blank"
        >ⓘ</a>
      </div>
    </div>
  );
};

export default Fact;