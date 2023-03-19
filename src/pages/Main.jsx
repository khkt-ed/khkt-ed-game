import { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { motion } from "framer-motion";
import FoodMenuItem from "../components/FoodMenuItem/FoodMenuItem";
import Book from "../components/Book/Book";
import delay from "delay";
import Bubble from "../components/Bubble/Bubble";
import PetImg from "../assets/images/young-kiwi.png"
import MessyLibraryImg from "../assets/images/messy library.jpg"

const food = ["🍌", "🍇", "🥕", "🍈", "🍉", "🍊", "🍎", "🍐", "🥒", "🥬"];

const hour = 36e5;

const criticalThreshold = 24 * hour;
const criticalDelay = 1 * hour;

const variants = {
  open: { x: 0, y: "-50%" },
  closed: { x: "-50%", y: "-50%" },
};

const pickRandom = (arr,count) => {
  let _arr = [...arr];
  return[...Array(count)].map( ()=> _arr.splice(Math.floor(Math.random() * _arr.length), 1)[0] );
}

function useDidMount() {
  const mountRef = useRef(false);

  useEffect(() => { mountRef.current = true }, []);

  return () => mountRef.current;
}

const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

const Main = props => {
  const isMount = useIsMount();

  const [hunger, setHunger] = useLocalStorage({ key: "hunger", defaultValue: 5 });
  const [happiness, setHappiness] = useLocalStorage({ key: "happiness", defaultValue: 5 });

  const [quizzes, setQuizzes] = useLocalStorage({ key: "quizzes", defaultValue: [
    {
      question: "How high is the mortality rate of eating disorders?",
      choices: ["2nd", "11th", "13th"],
      answer: 0,
      href: "https://www.hsph.harvard.edu/striped/report-economic-costs-of-eating-disorders",
      selected: -1,
      saved: false,
      fontSize: 1
    },
    {
      question: "Which factor was considered the most important predictor of developing an eating disorder in 14-and-15-year-olds?",
      choices: ["Dieting", "Vomiting"],
      answer: 0,
      href: "https://pediatrics.aappublications.org/content/138/3/e20161649",
      selected: -1,
      saved: false,
      fontSize: 1
    },
    {
      question: "Although eating disorders can be successfully treated, only 1 in 10 people with an eating disorder ever receives treatment.",
      choices: ["True", "False"],
      href: "http://eatingdisorderscoalition.org.s208556.gridserver.com/couch/uploads/file/Eating%20Disorders%20Fact%20Sheet.pdf",
      answer: 0,
      selected: -1,
      saved: false,
      fontSize: 1
    },
    {
      question: "Eating disorders are …. illnesses categorized by unhealthy relationships with food and serious disturbances in eating behavior.",
      choices: ["Mental", "Physical", "Mental and physical"],
      answer: 2,
      href: "https://www.nimh.nih.gov/health/publications/eating-disorders/index.shtml",
      selected: -1,
      saved: false,
      fontSize: 0.9
    },
    {
      question: "1 in 5 teenagers with bulimia nervosa and 1 in 4 teenagers with anorexia nervosa is …",
      choices: ["Female", "Male"],
      answer: 1,
      href: "https://www.hhs.gov/ash/oah/news/e-updates/april-2018-eating-disorders/index.html",
      selected: -1,
      saved: false,
      fontSize: 1
    },
    {
      question: "What are three of the most common eating disorders?",
      choices: ["Anorexia nervosa, binge-eating disorder, and bulimia nervosa", "Anorexia nervosa, rumination disorder, and pica"],
      href: "https://www.nimh.nih.gov/health/publications/eating-disorders/index.shtml",
      answer: 0,
      selected: -1,
      saved: false,
      fontSize: 1
    },
    {
      question: "A normal, healthy amount of food for an average teenager or adult is about … calories a day.",
      choices: ["1,600 - 2,400", "1,800 - 2,600"],
      href: "https://www.factretriever.com/eating-disorders-facts",
      answer: 1,
      selected: -1,
      saved: false,
      fontSize: 1
    },
    {
      question: "Anorexia nervosa is also known as the …",
      choices: ["“Luxurious girl’s syndrome”", "“Rich girl’s syndrome”"],
      answer: 1,
      href: "https://www.factretriever.com/eating-disorders-facts",
      selected: -1,
      saved: false,
      fontSize: 1
    },
    {
      question: "The average age when bulimia begins is …",
      choices: ["22", "18", "20"],
      answer: 2,
      href: "https://www.factretriever.com/eating-disorders-facts",
      selected: -1,
      saved: false,
      fontSize: 1
    },
    {
      question: "Who was the first to coin the term anorexia nervosa in the Anorexia Hysterica and helped move the study of anorexia into the field of psychiatry?",
      choices: ["William Gull", "Pierre Janet"],
      answer: 0,
      href: "https://www.factretriever.com/eating-disorders-facts",
      selected: -1,
      saved: false,
      fontSize: 0.9
    },
    {
      question: "Anorexia is the … most common chronic illness in adolescents.",
      choices: ["Second", "Third", "Fifth"],
      answer: 1,
      href: "https://www.factretriever.com/eating-disorders-facts",
      selected: -1,
      saved: false,
      fontSize: 1
    },
    {
      question: "Who is credited with publishing the first description of bulimia nervosa?",
      choices: ["Gerald Russel", "Richard Morton"],
      answer: 0,
      href: "https://www.factretriever.com/eating-disorders-facts",
      selected: -1,
      saved: false,
      fontSize: 1
    },
    {
      question: "Studies suggest that genetic factors play a significant role in the development of eating disorders.",
      choices: ["True", "False"],
      answer: 0,
      href: "https://www.factretriever.com/eating-disorders-facts",
      selected: -1,
      saved: false,
      fontSize: 1
    },
    {
      question: "Testosterone may not play a significant role in the origins of eating disorders in males.",
      choices: ["True", "False"],
      answer: 1,
      href: "https://www.factretriever.com/eating-disorders-facts",
      selected: -1,
      saved: false,
      fontSize: 1
    },
    {
      question: "Of those suffering from an eating disorder, only … will receive treatment. ",
      choices: ["1 in 10", "4 in 10", "7 in 10"],
      answer: 0,
      href: "https://www.factretriever.com/eating-disorders-facts",
      selected: -1,
      saved: false,
      fontSize: 1
    },
    {
      question: "Who is considered to have recorded the earliest medical description of anorexic illness?",
      choices: ["Richard Morton", "Hilde Bruch"],
      answer: 0,
      href: "https://www.factretriever.com/eating-disorders-facts",
      selected: -1,
      saved: false,
      fontSize: 1
    },
    {
      question: "People with extreme anorexia will develop downy body hair that grows on the back, arms, legs, face and neck.",
      choices: ["True", "False"],
      answer: 0,
      href: "https://www.factretriever.com/eating-disorders-facts",
      selected: -1,
      saved: false,
      fontSize: 1
    },
    {
      question: "Bulimics can use laxatives to prevent their bodies from absorbing food by fast elimination.",
      choices: ["True", "False"],
      answer: 1,
      href: "https://www.factretriever.com/eating-disorders-facts",
      selected: -1,
      saved: false,
      fontSize: 1
    },
    {
      question: "Scientists suggest that some girls develop anorexia because they are afraid to separate from their parents, particularly their mothers.",
      choices: ["True", "False"],
      answer: 0,
      href: "https://www.factretriever.com/eating-disorders-facts",
      selected: -1,
      saved: false,
      fontSize: 0.9
    },
    {
      question: "Eating disorders usually begin in males around age …",
      choices: ["12 - 14", "15 - 17"],
      answer: 0,
      href: "https://www.factretriever.com/eating-disorders-facts",
      selected: -1,
      saved: false,
      fontSize: 1
    },
    {
      question: "Due to repeated vomiting, bulimics may develop painful cracks in the corners of their mouths called …",
      choices: ["Cheilosis", "Lanugo"],
      answer: 0,
      href: "https://www.factretriever.com/eating-disorders-facts",
      selected: -1,
      saved: false,
      fontSize: 1
    },
    {
      question: "Once an eating disorder patient gains weight then everything will be back to normal.",
      choices: ["True", "False"],
      answer: 1,
      href: "https://www.hopkinsallchildrens.org/Services/Pediatric-and-Adolescent-Medicine/Adolescent-and-Young-Adult-Specialty-Clinic/Eating-Disorders/Eating-Disorder-Facts",
      selected: -1,
      saved: false,
      fontSize: 1
    },
    {
      question: "Patients will never recover from an eating disorder.",
      choices: ["True", "False"],
      answer: 1,
      href: "https://www.hopkinsallchildrens.org/Services/Pediatric-and-Adolescent-Medicine/Adolescent-and-Young-Adult-Specialty-Clinic/Eating-Disorders/Eating-Disorder-Facts",
      selected: -1,
      saved: false,
      fontSize: 1
    },
    {
      question: "It is common for a child to have other mental health illnesses besides their eating disorder.",
      choices: ["True", "False"],
      answer: 0,
      href: "https://www.hopkinsallchildrens.org/Services/Pediatric-and-Adolescent-Medicine/Adolescent-and-Young-Adult-Specialty-Clinic/Eating-Disorders/Eating-Disorder-Facts",
      selected: -1,
      saved: false,
      fontSize: 1
    },
    {
      question: "People who suffer anorexia nervosa are … times more likely to die of suicide than their peers.",
      choices: ["17", "13", "57"],
      answer: 2,
      href: "http://eatingdisorderscoalition.org.s208556.gridserver.com/couch/uploads/file/Eating%20Disorders%20Fact%20Sheet.pdf",
      selected: -1,
      saved: false,
      fontSize: 1
    },
  ]});

  const [facts, setFacts] = useLocalStorage({ key: "facts", defaultValue: [
    {
      statement: "While eating disorders can affect anyone, there are a variety of biological, physcological, and sociocultural risk factors, including but not limited to body image dissatisfaction, weight stigma, personal trauma, and family history of mental illness.",
      href: "https://www.nationaleatingdisorders.org/risk-factors",
      saved: false,
      used: true,
      fontSize: 1.25
    },
    {
      statement: "An estimated 30 million people in the US struggle with an eating disorder (20 million women and 10 million men).",
      href: "https://www.mhanational.org/conditions/eating-disorders",
      saved: false,
      used: true,
      fontSize: 1.7
    },
    {
      statement: "It’s common for people with an eating disorder to have one or more co-occuring conditions. One study found that 71% of people with an eating disorder were also diagnosed with an anxiety or mood disorder.",
      href: "https://www.google.com",
      saved: false,
      used: true,
      fontSize: 1.35
    },
    {
      statement: "Eating disorders have the highest mortality rate of any mental illness. Every hour, at least one person dies in the US as a direct result from an eating disorder.",
      href: "http://eatingdisorderscoalition.org.s208556.gridserver.com/couch/uploads/file/fact-sheet_2016.pdf",
      saved: false,
      used: true,
      fontSize: 1.4
    },
    {
      statement: "In the US, eating disorder research is the least funded of all mental illness research. In 2018, the US Department of Health & Human Services spent $38 million researching eating disorders, compared to $213 million researching anxiety disorders and $500 million researching depression.",
      href: "https://report.nih.gov/categorical_spending.aspx",
      saved: false,
      used: false,
      fontSize: 1.2
    },
    {
      statement: "Almost 3% of teenagers (ages 13-18) are diagnosed with an eating disorder. Although teenage girls are generally at a higher risk of developing an eating disorder than boys, 1 in 5 teenagers with bulimia nervosa and 1 in 4 teenagers with anorexia nervosa is male.",
      href: "https://www.hhs.gov/ash/oah/news/e-updates/april-2018-eating-disorders/index.html",
      saved: false,
      used: false,
      fontSize: 1.2
    },
    {
      statement: "Research shows that global rates of disordered eating have increased from 2000 to 2018. One study found that rates were increasing faster in male, low-income, and older populations.",
      href: "https://academic.oup.com/ajcn/article/109/5/1402/5480601",
      saved: false,
      used: false,
      fontSize: 1.4
    },
    {
      statement: "Nearly 10 million females and 1 million males have a form of anorexia or bulimia in the United States. Millions more are struggling with compulsive eating disorders. Additionally, over 70 million people worldwide struggle with an eating disorder.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.3
    },
    {
      statement: "The number of reported cases of anorexia in young women between 15 and 19 has risen each decade since 1930.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.6
    },
    {
      statement: "Eating disorders include anorexia nervosa, bulimia nervosa, and eating disorders not otherwise specified (EDNOS), under which binge eating disorder falls.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.45
    },
    {
      statement: "Bulimics almost always binge on “forbidden food,” such as junk food or fast food. They often feel powerless to stop eating during binges.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.6
    },
    {
      statement: "Anorexia nervosa became an increasing problem during the Victorian era. Some researchers speculate that food was one of the few areas in life during that time where women had some control. Additionally, a woman with an appetite was associated with indulgence and lack of control. Conversely, a frail, pale, and thin woman was associated with femininity and attractiveness.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1
    },
    {
      statement: "Depression, loneliness, poor self-esteem, substance abuse, feelings of inadequacy, anger, and anxiety are common among people who develop eating disorders. Additionally, those who are praised or ridiculed for their weight or sexual development are also at greater risk.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.2
    },
    {
      statement: "Eating disorders are associated with unstable or troubled family relationships. However, even loving and nurturing families may inadvertently foster an eating disorder by overemphasizing thinness or by having overly high expectations.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.3
    },
    {
      statement: "People with eating disorders often have a distorted body image.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 2
    },
    {
      statement: "The number of reported cases of bulimia in females ages 10-39 tripled between 1988 and 1993.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 2
    },
    {
      statement: "In the late 1990s, websites called pro-ana (pro-anorexia) and pro-mia (pro-bulimia) were created for anorexics and bulimics to connect with one another. Many people on these sites deny that anorexia and bulimia are disorders and instead claim they are merely a lifestyle choice.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.2
    },
    {
      statement: "Anorexia nervosa increased so rapidly in the 1980s in the U.S. that the disease became known as the “disorder of the 80s”.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.7
    },
    {
      statement: "Bulimia (“bous”-ox, “limous”-hunger) nervosa first entered the English language in the late 1970s, though descriptions of bulimic behavior have been found in ancient texts.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.55
    },
    {
      statement: "Orthorexics are obsessed with food quality rather than quantity. They are not so much obsessed with a thin body but personal purity.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.5
    },
    {
      statement: "Tumors and lesions in the brain have been associated with the development of abnormal eating patterns and symptoms of eating disorders.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.6
    },
    {
      statement: "Forty percent of new cases of anorexia are in girls between the ages of 15 and 19.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 2
    },
    {
      statement: "Damage to the fetus’s brain either during pregnancy or during birth has been shown to contribute to ADHD and other personality traits associated with eating disorders.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.55
    },
    {
      statement: "Approximately 10-15% of anorexics or bulimics are male. White males are the least likely to try to control their weight; Latino males are the most likely.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.5
    },
    {
      statement: "The reason fewer boys develop eating disorders may be that they are older when they reach puberty and may be more emotionally prepared to deal with their changing bodies. Additionally, boys tend to be less critical of their bodies than girls.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.3
    },
    {
      statement: "Weight loss in anorexics is most obvious in the arms and legs. The loss of subcutaneous fat (fat directly under the skin layers) makes the shape of the bones very easy to see.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.4
    },
    {
      statement: "The heart rate of a person with anorexia might drop from a normal 60-100 beats per minute to lower than 60 beats a minute.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.65
    },
    {
      statement: "Amenorrhea occurs in anorexics because extremely low body weight can interrupt hormone functions and stop ovulation. It can permanently affect a woman’s fertility. ",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.5
    },
    {
      statement: "Males get eating disorders, too.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 2
    },
    {
      statement: "Anorexia is one of the most common psychiatric diagnoses in young women.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 2
    },
    {
      statement: "A University of Southern California study in 2009 revealed that African American girls are 50% more likely to be bulimic than white girls. Additionally, girls from families in the lowest income bracket studied are 153% more likely to be bulimic than girls from the highest income bracket.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.2
    },
    {
      statement: "Dennis Quaid battled anorexia after shedding weight to play a man dying from tuberculosis in the film Wyatt Earp in the mid 1990s.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.6
    },
    {
      statement: "Compulsive (or binge) eating disorder is similar to bulimia in several ways. In both disorders, a person feels guilt and remorse about overeating. However, people who suffer from compulsive eating disorder do not purge. They also are often overweight or obese, placing them at a higher risk for developing cardiovascular disease and high blood pressure.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.05
    },
    {
      statement: "Anorexia typically begins at or just after puberty. Bulimia occurs in slightly older females, typically around 18. More people suffer from compulsive eating disorder than from bulimia or anorexia.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.4
    },
    {
      statement: "Certain professions such as dancing, modeling, and horse racing have higher-than-average rates of eating disorders.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.75
    },
    {
      statement: "In 1380, St. Saint Catherine of Siena starved herself to death, which was interpreted as a form of religious asceticism.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.75
    },
    {
      statement: "During the Middle Ages, fasting was believed to bring a person closer to God. In the 1300s, for example, St. Catherine of Siena was famous for her ability to live on very small amounts of food. Supposedly, she also would make herself vomit by sticking a twig down her throat.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.1
    },
    {
      statement: "It is estimated that 20-40% of models suffer from some type of eating disorder. Some groups are urging the fashion industry to ban the use of size “0” models. Size 0 usually corresponds to someone who has a Body Mass Index (BMI) below 18.5. An adult who has a BMI between 18.5 and 24.9 is considered to be at a healthy weight. An adult with a BMI of 25.0-29.9 is considered overweight. An adult with a BMI of 30 or higher is considered obese.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 0.95
    },
    {
      statement: "Anorexia has one of the highest mortality rates of any mental illness. Approximately one in 10 cases of anorexia nervosa ends in death.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.6
    },
    {
      statement: "In the U.S., 1-2% of the female population and 0.1-0.2 % of males suffer from anorexia.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 2
    },
    {
      statement: "Most fashion models are thinner than 98% of American women. The average American woman is 5’4” and weighs 140 pounds. The average model is 5’11” and weighs 117 pounds.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.5
    },
    {
      statement: "In 1995, before television was common in Fiji, Fijians thought the ideal body shape was round, plump, and soft. After three years of watching American shows such as Melrose Place and Beverley Hills 90210, girls in Fiji began developing eating disorders. Fijian females who watched TV three or more hours a night were 50% more likely to feel “too big” or “too fat” than those who watched less TV.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 0.95
    },
    {
      statement: "Anorexia affects people of all ages, genders, and ethnic backgrounds; however, young white women who are high academic achievers are more likely to develop the illness.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.4
    },
    {
      statement: "We turn skeletons into goddesses and look to them as if they might teach us how not to need.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.8
    },
    {
      statement: "Girls with ADHD and PTSD are at an increased risk for developing eating disorders and depression. Additionally, studies show that girls in foster care are at an increased risk for developing an eating disorder.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.35
    },
    {
      statement: "Although anorexia is more common among young people than any other age group, it is more deadly in the elderly. From 1986 to 1990, the elderly accounted for 78% of all deaths due to anorexia.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.5
    },
    {
      statement: "Purging causes serious health problems, including severe tooth decay, swollen cheeks and salivary glands, dangerous loss of potassium that can lead to fatal heart problems, and a ruptured esophagus or stomach. Like anorexia, bulimia also damages the body’s organs, including the stomach and kidneys.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1
    },
    {
      statement: "The National Association of Anorexia Nervosa and Associated Disorders reports that only 30-40% of anorexics ever fully recover.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.6
    },
    {
      statement: "Karen Carptenter, the lead singer of The Carpenters, died of heart failure related to her struggle with anorexia.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.9
    },
    {
      statement: "Celebrities who have had a history of eating disorders include Paula Abdul, Karen Carpenter, Jane Fonda, Elton John, Princess Diana, Lynn Redgrave, Billy Bob Thornton, and Joan Rivers.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.45
    },
    {
      statement: "Nearly 14% of gay men suffer from bulimia and over 20% suffer from anorexia. Scientists believe, however, that such high numbers for homosexuals may be due to their being more comfortable admitting to an eating disorder and seeking treatment, not that homosexuality is a factor in developing an eating disorder.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 1.15
    },
    {
      statement: "An eating disorder is characterized by abnormal eating patterns that attempt to satisfy a psychological rather than physical need. The three most common disorders are anorexia nervosa, bulimia nervosa, and binge eating disorder. Anorexia nervosa is characterized by self-starvation, weight loss, an irrational fear of gaining weight, and a distorted body image. Bulimia nervosa is characterized by a cycle of compulsive binging followed by purging through various means, such as vomiting, laxative/diuretic abuse, and extreme exercising. Binge eating disorder is the most common disorder and is characterized by frequent periods of compulsive overeating without accompanying purging behaviors.",
      href: "https://www.factretriever.com/eating-disorders-facts",
      saved: false,
      used: false,
      fontSize: 0.8
    }
  ]});

  const [foodMenuOpened, setFoodMenuOpened] = useState(false);
  const [currentFood, setCurrentFood] = useState();
  const [foodEaten, setFoodEaten] = useState(false);
  const [actionPending, setActionPending] = useState("none");

  const [open, setOpen] = useState(false);
  const [lmaoOpen, setLmaoOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  const [selected, setSelected] = useState("facts");

  const setABtnUnavailable = () => {
    document.querySelectorAll(".feed-button, .play-button").forEach(e => {
      e.classList.add("unavailable");
    });
  };

  const setABtnAvailable = () => {
    document.querySelectorAll(".feed-button, .play-button").forEach(e => {
      e.classList.remove("unavailable");
      e.classList.remove("cooldown");
    });
  };

  const [time, setTime] = useLocalStorage({ key: "time" });
  const [time2, setTime2] = useLocalStorage({ key: "time2" });
  const [time3, setTime3] = useLocalStorage({ key: "time3" });
  const [time4, setTime4] = useLocalStorage({ key: "time4" });
  const [time5, setTime5] = useLocalStorage({ key: "time5" });

  const [todayQuizzes, setTodayQuizzes] = useLocalStorage({
    key: "today-quizzes",
    defaultValue: quizzes.filter(e => e.selected === -1).slice(0, 4)
  })
  const [todayFacts, setTodayFacts] = useLocalStorage({
    ket: "today-facts",
    defaultValue: facts.slice(0, 4)
  });

  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [bubbleContent, setBubbleContent] = useState("");
  const [critical, setCritical] = useLocalStorage({ key: "critital", defaultValue: false });
  const [ngulon, setNgulon] = useLocalStorage({ key: "ngulon", defaultValue: true });
  const [eatenYet, setEatenYet] = useLocalStorage({ key: "eaten-yet", defaultValue: false });
  const [ditmemay, setDitmemay] = useLocalStorage({ key: "ditmemay", defaultValue: 0 });

  useEffect(() => {
    const now = Date.now();
    if (!localStorage.getItem("time")) {
      setTime(now);
    }
    if (!localStorage.getItem("time2")) {
      setTime2(now);
    }
    if (!localStorage.getItem("time3")) {
      setTime3(now);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = now - time, diff2 = now - time2;
      const hungerThreshold = 1.5 * hour, happinessThreshold = hour;
      // const hungerThreshold = 1000, happinessThreshold = 1000;
      if (diff > hungerThreshold) {
        setHunger(Math.max(hunger - Math.floor(diff / hungerThreshold), 0));
        setTime(now);
      }

      if (diff2 > happinessThreshold) {
        setHappiness(Math.max(happiness - Math.floor(diff2 / happinessThreshold), 0));
        setTime2(now);
      }

      if (time4 !== undefined) {
        const diff3 = now - time4;
        if (diff3 > criticalThreshold) {
          if (!critical) {
            setCritical(true);
          }
        }
      }

      if (time5 !== undefined) {
        const diff4 = now - time5;
        if (diff4 > criticalDelay) {
          setEatenYet(false);
        }
      }
      
      if (actionPending === "none") {
        if (hunger === 0 || happiness === 0) {
          const now = Date.now();
          if (hunger === 0 && happiness === 0) {
            setBubbleContent("You forgot about me...");
            if (ngulon) {
              setTime4(now);
              setNgulon(false);
            }
          }
          else {
            if (hunger === 0) {
              setBubbleContent("I'm hungry...");
              if (ngulon) {
                setTime4(now);
                setNgulon(false);
              }
            }
            else if (happiness === 0) {
              setBubbleContent("I need to play...");
              setBubbleOpen(true);
            }
          }
        }
      }

      if (new Date(now).toDateString() !== new Date(time3).toDateString()) {
        const filtered = quizzes.filter(e => e.selected === -1);
        const filtered2 = facts.filter(e => !e.used);
        setTodayQuizzes(pickRandom(filtered, Math.min(4, filtered.length)));
        const randomFacts = pickRandom(filtered2, Math.min(4, filtered2.length));
        setTodayFacts(randomFacts.map(e => {
          return { ...e, used: true };
        }));
        const lmao = facts.map(e => JSON.stringify(e));
        const lmao2 = facts.slice();
        randomFacts.forEach(e => {
          lmao2[lmao.indexOf(JSON.stringify(e))].used = true;
        });
        setFacts(lmao2);
        setTime3(now);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    if (bubbleContent !== "") {
      setBubbleOpen(true);
    }
  }, [bubbleContent]);

  useEffect(() => {
    if (actionPending === "none") {
      setBubbleOpen(false);
      setBubbleContent("");
    }
    else {
      if (bubbleContent !== "" && bubbleContent !== "I'm full..." && bubbleContent !== "I'm too full..." && bubbleContent !== "I'm already happy...") {
        setBubbleOpen(false);
        setBubbleContent("");
      }
    }
  }, [actionPending])
  
  return (
    <div className="main-container" style={{ backgroundColor: lmaoOpen || savedOpen ? "dimgrey" : "" }}>
      <div className="game-container" style={{ gap: (1 * props.scale).toString() + "rem" }}>
        <div className="header">
          <h1 className="header__h1" style={{ fontSize: (3.8 * props.scale).toString() + "rem" }}>Virtual Pet!</h1>
          <p className="header__p" style={{ fontSize: (1.8 * props.scale).toString() + "rem" }}>Welcome to your personal Pet!</p>
        </div>
        <div className="pet-container" >
          <img className="pet-img" src={PetImg} />
          {actionPending === "feed" ?
            <motion.div
              initial={{ y: 150 }}
              animate={{ y: 0 - 50 * (1 - props.scale) }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ position: "absolute" }}
            >
              <div className="container">
                <div className="plate">
                  <div className="inner-plate" />
                </div>
                {!foodEaten ?
                  <div className="food-on-plate" style={{ fontSize: (5.5 * props.scale).toString() + "rem" }}>
                    {currentFood}
                  </div>
                : ""}
              </div>
            </motion.div>
          : ""}
          {bubbleOpen ? <Bubble scale={props.scale}>{bubbleContent}</Bubble> : ""}
        </div>
        <div className="pet-action-container" style={{ marginTop: (1 * props.scale).toString() + "rem" }}>
          {foodMenuOpened ?
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              style={{ position: "absolute" }}
            >
              <div className="food-menu" style={{
                  width: (10 * props.scale).toString() + "rem",
                  height: (20 * props.scale).toString() + "rem",
                  transform: `translate(calc(${props.scale} * -50%), -105%)`
                }}>
                {[...Array(food.length).keys()].map(e =>
                  <FoodMenuItem
                    scale={props.scale}
                    key={e}
                    food={food}
                    foodId={e}
                    hunger={hunger}
                    setHunger={setHunger}
                    setFoodMenuOpened={setFoodMenuOpened}
                    actionPending={actionPending}
                    setActionPending={setActionPending}
                    setABtnAvailable={setABtnAvailable}
                    setABtnUnavailable={setABtnUnavailable}
                    setCurrentFood={setCurrentFood}
                    setFoodEaten={setFoodEaten}
                    setBubbleOpen={setBubbleOpen}
                    setBubbleContent={setBubbleContent}
                    setNgulon={setNgulon}
                    critical={critical}
                    setCritical={setCritical}
                    eatenYet={eatenYet}
                    setEatenYet={setEatenYet}
                    time4={time4}
                    setTime4={setTime4}
                    setTime5={setTime5}
                    ditmemay={ditmemay}
                    setDitmemay={setDitmemay}
                  />
                )}
              </div>
            </motion.div>
          : ""}
          <button className="pet-action-button feed-button" style={{ fontSize: (1.8 * props.scale).toString() + "rem" }} onClick={() => {
            if (actionPending === "none" || foodMenuOpened) {
              setFoodMenuOpened(!foodMenuOpened);
            }
          }}>
            Feed
          </button>
          <button className="pet-action-button play-button" style={{ fontSize: (1.8 * props.scale).toString() + "rem" }} onClick={async e => {
            if (actionPending === "none") {
              setActionPending("play");
              setABtnUnavailable();
              document.querySelector(".play-button").classList.add("cooldown");

              if (happiness >= 5) {
                setBubbleContent("I'm already happy...");
                await delay(3000);
                setABtnAvailable();
                setActionPending("none");
                return;
              }

              await delay(3000);
              setABtnAvailable();
              setActionPending("none");
              setHappiness(5);
            }
          }}>
            Play
          </button>
          <button
            className={"pet-action-button daily-button" + (todayQuizzes.filter(e => e.selected !== -1).length < todayQuizzes.length ? " unfinished" : "")}
            style={{ marginLeft: "auto", fontSize: (1.8 * props.scale).toString() + "rem"}}
            onClick={(event) => {
              if (!savedOpen) {
                setLmaoOpen(true);
                event.currentTarget.classList.add("unavailable");
                document.querySelector(".saved-button").classList.add("unavailable");
              }
            }}
          >
            Daily
          </button>
          <button className="pet-action-button saved-button" style={{ fontSize: (1.8 * props.scale).toString() + "rem" }} 
            onClick={event => {
              if (!lmaoOpen) {
                setSavedOpen(true);
                event.currentTarget.classList.add("unavailable");
                document.querySelector(".daily-button").classList.add("unavailable");
              }
            }}
          >
            Saved
          </button>
        </div>
        <div className="stats-container">
          <div className="stat">
            <p style={{ fontSize: (1.8 * props.scale).toString() + "rem" }}>
              {"Food: "}
              {Array(hunger).fill().map((_, i) => {
                return <span key={i} className="sex">🍖</span>;
              })}
            </p>
          </div>
          <div className="stat">
            <p style={{ fontSize: (1.8 * props.scale).toString() + "rem" }}>
              {"Happy: "}
              {Array(happiness).fill().map((_, i) => {
                return <span key={i} className="sex">😜</span>;
              })}
            </p>
          </div>
        </div>
      </div>
      {lmaoOpen ?
        <motion.div
          className="book-container"
          initial={{ y: 1000 }}
          animate={{ y: 0 }}
          style={{ backgroundImage: `url('${MessyLibraryImg}')` }}
        >
          <motion.div
            animate={open ? "open" : "closed"}
            initial={{ x: "-50%", y: "-50%" }}
            variants={variants}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "calc(min(9.8vh, 6.8vw) * 5.3)",
              height: "calc(min(9.8vh, 6.8vw) * 8.3)",
            }}
          >
            <div className="glowing-shit" />
            <Book
              open={open}
              setOpen={setOpen}
              quizzes={quizzes}
              setQuizzes={setQuizzes}
              todayQuizzes={todayQuizzes}
              setTodayQuizzes={setTodayQuizzes}
              facts={facts}
              setFacts={setFacts}
              todayFacts={todayFacts}
              setTodayFacts={setTodayFacts}
              scale={props.scale}
            />
          </motion.div>
          <button className="close-button" onClick={() => {
            setLmaoOpen(false);
            setOpen(false);
            document.querySelector(".daily-button").classList.remove("unavailable");
            document.querySelector(".saved-button").classList.remove("unavailable");
          }}>
            <div className="line" />
            <div className="line" />
          </button>
        </motion.div>
      : ""}
      {savedOpen ?
        <motion.div
          className="saved-container"
          initial={{ y: 1000 }}
          animate={{ y: 0 }}
        >
          <div className="saved-content">
            {(selected === "facts" ? facts : quizzes).filter(e => e.saved).length === 0 ?
              <div className="bruhhh" style={{ padding: "3%", marginLeft: "2.5%" }}>Nothing to show here! You haven't saved any yet!</div>
            : ""}
            {(selected === "facts" ? facts : quizzes).filter(e => e.saved).map((element, i) => {
              return (
                <div key={i} className="saved-item" style={{ borderBottom: i !== (selected === "facts" ? facts : quizzes).filter(e => e.saved).length - 1 ? "2px solid #ccc" : "" }}>
                  <div className="bruhhh" style={{ marginBottom: "2%" }}>{selected === "facts" ? element.statement : element.question + " (" + element.choices[element.answer] + ")"}</div>
                  <div className="i-give-up" style={{
                    position: "relative",
                    left: "78%",
                    display: "flex",
                    height: "18%",
                    width: "18%",
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
                        fontSize: (2.5 * props.scale).toString() + "rem",
                        textDecoration: "none",
                        fontFamily: "sans-serif",
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        let target = selected === "facts" ? facts : quizzes;
                        let target2 = selected === "facts" ? todayFacts : todayQuizzes;
                        target = target.slice();
                        target2 = target2.slice();
                        const index = target.indexOf(element);
                        const index2 = target2.map(e => JSON.stringify(e)).indexOf(JSON.stringify(element));
                        
                        if (index > -1) {
                          target[index].saved = !target[index].saved;
                        }

                        if (index2 > -1) {
                          target2[index2].saved = !target2[index2].saved;
                        }

                        if (selected === "facts") {
                          setFacts(target);
                          setTodayFacts(target2);
                        }
                        else {
                          setQuizzes(target);
                          setTodayQuizzes(target2);
                        }
                      }}
                    >✓</a>
                    <a
                      className="info"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: (2.5 * props.scale).toString() + "rem",
                        textDecoration: "none",
                        fontFamily: "sans-serif"
                      }}
                      href="https://www.google.com"
                      target="_blank"
                    >ⓘ</a>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="saved-options">
            <button className={"saved-option facts-button" + (selected === "facts" ? " unavailable" : "")} style={{ fontSize: (2 * props.scale).toString() + "rem" }} onClick={() => {
                setSelected("facts");
                document.querySelector(".facts-button").classList.add("unavailable");
                document.querySelector(".quizzes-button").classList.remove("unavailable");
              }}
            >
              Facts
            </button>
            <button className={"saved-option quizzes-button" + (selected === "quizzes" ? " unavailable" : "")} style={{ fontSize: (2 * props.scale).toString() + "rem" }} onClick={() => {
                setSelected("quizzes");
                document.querySelector(".facts-button").classList.remove("unavailable");
                document.querySelector(".quizzes-button").classList.add("unavailable");
              }}
            >
              Quizzes
            </button>
          </div>
          <button
            className="close-button"
            onClick={() => {
              setSavedOpen(false);
              document.querySelector(".saved-button").classList.remove("unavailable");
              document.querySelector(".daily-button").classList.remove("unavailable");
            }}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
            }}
          >
            <div className="line" />
            <div className="line" />
          </button>
        </motion.div>
      : ""}
    </div>
  );
};

export default Main;