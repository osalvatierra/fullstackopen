export type StatsLineProps = {
  text: string;
  value: number;
};

export default function StatisticLine({ text, value }: StatsLineProps) {
  if (value) {
    return (
      <div>
        <p>
          {text}: {value}
        </p>
      </div>
    );
  }
}
