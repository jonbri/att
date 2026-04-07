import classnames from "classnames";
import "@/global.scss";

import { attendance } from "./data";
import { getGreenColor, getFigures } from "./logic";
import { AsciiChart } from "@/components/AsciiChart";

export default function Home() {
  const {
    totalInOffice,
    totalOffice,
    highestPercent,
    lowestPercent,
    highestRate,
    lowestRate,
    totalInOfficeLast6Months,
    totalAbsentLast6Months,
    inOfficePercentageLast6Months,
    totalOfficeLast6Months,
    rateLast6Months,
    totalAbsent,
    rate,
    inOfficePercentage,
    lowestPresent,
    highestPresent,
    lowestAbsent,
    highestAbsent,
    totalDiff,
    last6MonthsDiff,
    // 2024 data
    totalInOffice2024,
    totalOffice2024,
    totalAbsent2024,
    inOfficePercentage2024,
    rate2024,
    diff2024,
    // 2025 data
    totalInOffice2025,
    totalOffice2025,
    totalAbsent2025,
    inOfficePercentage2025,
    rate2025,
    diff2025,
    // 2026 data
    totalInOffice2026,
    totalOffice2026,
    totalAbsent2026,
    inOfficePercentage2026,
    rate2026,
    diff2026,
  } = getFigures(attendance);
  const aggregateClass =
    parseInt(rate) >= 3 ? "aggregate-good" : "aggregate-bad";

  const chartData = attendance.map(([date, present, total]) => ({
    month: date,
    rate: parseFloat(((5 * ((present / total) * 100)) / 100).toFixed(2)),
  }));

  return (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Pres</th>
            <th>Abs</th>
            <th>Tot</th>
            <th>Pct</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map(([date, present, total], i) => {
            const absent = total - present;
            const inOfficePercentageValue = (present / total) * 100;
            const inOfficePercentage = `${inOfficePercentageValue.toFixed(1)}%`;
            const rate = (5 * ((present / total) * 100)) / 100;
            const isHighestPercent =
              `${highestPercent.toFixed(1)}%` === inOfficePercentage;
            const isLowestPercent =
              `${lowestPercent.toFixed(1)}%` === inOfficePercentage;
            return (
              <tr key={date}>
                <th className="index">{i}</th>
                <th
                  className={classnames(
                    isHighestPercent ? "highlighted" : undefined,
                  )}
                >
                  {date}
                </th>
                <td
                  className={classnames(
                    present === lowestPresent && "bad",
                    present === highestPresent && "good",
                  )}
                >
                  {present}
                </td>
                <td
                  className={classnames(
                    absent === lowestAbsent && "good",
                    absent === highestAbsent && "bad",
                  )}
                >
                  {absent}
                </td>
                <td>{total}</td>
                <td
                  className={classnames(
                    isLowestPercent && "bad",
                    isHighestPercent && "good",
                  )}
                >
                  {inOfficePercentage}
                </td>
                <td
                  style={
                    {
                      "--rate-bg": getGreenColor(inOfficePercentageValue),
                    } as React.CSSProperties
                  }
                  className={classnames(
                    "rate-cell",
                    lowestRate === rate && "bad",
                    highestRate === rate && "good",
                  )}
                >
                  {rate.toFixed(1)}
                </td>
              </tr>
            );
          })}
          <tr className="sixmonths">
            <th></th>
            <th>2024</th>
            <th>{totalInOffice2024}</th>
            <th>{totalAbsent2024}</th>
            <th>{totalOffice2024}</th>
            <th>{inOfficePercentage2024}</th>
            <th className={aggregateClass}>
              {rate2024} ({diff2024})
            </th>
          </tr>
          <tr>
            <th></th>
            <th>2025</th>
            <th>{totalInOffice2025}</th>
            <th>{totalAbsent2025}</th>
            <th>{totalOffice2025}</th>
            <th>{inOfficePercentage2025}</th>
            <th className={aggregateClass}>
              {rate2025} ({diff2025})
            </th>
          </tr>
          <tr>
            <th></th>
            <th>2026</th>
            <th>{totalInOffice2026}</th>
            <th>{totalAbsent2026}</th>
            <th>{totalOffice2026}</th>
            <th>{inOfficePercentage2026}</th>
            <th className={aggregateClass}>
              {rate2026} ({diff2026})
            </th>
          </tr>
          <tr>
            <th></th>
            <th>Six Months</th>
            <th>{totalInOfficeLast6Months}</th>
            <th>{totalAbsentLast6Months}</th>
            <th>{totalOfficeLast6Months}</th>
            <th>{inOfficePercentageLast6Months}</th>
            <th className={aggregateClass}>
              {rateLast6Months} ({last6MonthsDiff})
            </th>
          </tr>
          <tr>
            <th></th>
            <th>Total</th>
            <th>{totalInOffice}</th>
            <th>{totalAbsent}</th>
            <th>{totalOffice}</th>
            <th>{inOfficePercentage}</th>
            <th className={aggregateClass}>
              {rate} ({totalDiff})
            </th>
          </tr>
        </tbody>
      </table>

      <div className="chart-container">
        <AsciiChart data={chartData} />
      </div>
    </>
  );
}
