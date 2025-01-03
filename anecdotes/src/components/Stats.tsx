import StatisticLine from "./StatisticLine";

export type StatProps = {
  good: number;
  neutral: number;
  bad: number;
  all: number;
  average: number;
  pos: number;
};

export default function Stats({
  good,
  neutral,
  bad,
  all,
  average,
  pos,
}: StatProps) {
  if (good || neutral || bad || all || average || pos) {
    return (
      <div>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <p>{all}</p>
        <p> {average}</p>
        <p>{pos}%</p>
      </div>
    );
  } else {
    <div>No Feedback Given</div>;
  }
}
