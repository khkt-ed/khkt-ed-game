import './FoodMenuItem.css'
import useSound from "use-sound";
import delay from "delay";

const FoodMenuItem = props => {
  const [playEatingSound] = useSound("/src/assets/sounds/eating.mp3");

  const handleClick = async () => {
    if (props.actionPending === "none") {
      props.setFoodMenuOpened(false);
      props.setABtnUnavailable();
      document.querySelector(".feed-button").classList.add("cooldown");

      props.setActionPending("aimware.com");
      
      sheesh:if (props.hunger >= 5 || props.critical) {
        if (props.critical && !props.eatenYet) {
          break sheesh;
        }
        if (props.critical) {
          props.setBubbleContent("I shouldn't eat more...");
        }
        else if (props.hunger >= 5) {
          props.setBubbleContent("I'm too full...");
        }
        props.setBubbleOpen(true);
        await delay(3000);
        props.setABtnAvailable();
        props.setActionPending("none");
        props.setBubbleOpen(false);
        return;
      }
      
      props.setActionPending("feed");
      props.setCurrentFood(props.food[props.foodId]);
      props.setBubbleOpen(false);
      
      await delay(1000);
      playEatingSound();

      await delay(1200);
      props.setFoodEaten(true);
      
      await delay(500);
      props.setABtnAvailable();
      props.setActionPending("none");
      props.setFoodEaten(false);
      props.setEatenYet(true);
      props.setTime5(Date.now());
      props.setNgulon(true);
      props.setBubbleOpen(true);
      props.setHunger(Math.min(props.hunger + 2, 5));

      if (props.time4 !== undefined) {
        props.setTime4(undefined);
      }

      if (props.critical) {
        if (props.ditmemay < 2) {
          props.setDitmemay(props.ditmemay + 1);
        }
        else {
          props.setCritical(false);
          props.setDitmemay(0);
          props.setTime4(undefined);
        }
      }
    }
  };

  return (
    <button className="food-menu-item" style={{ fontSize: (2.5 * props.scale).toString() + "rem" }} onClick={handleClick}>
      {props.food[props.foodId]}
    </button>
  );
};

export default FoodMenuItem;