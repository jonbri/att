import React from "react";

export function AsciiChart({
  data,
}: {
  data: Array<{ month: string; rate: number }>;
}) {
  const HEIGHT = 20;
  const MAX_VAL = 5;
  const TARGET = 3.0;
  const targetRow = Math.round((TARGET / MAX_VAL) * HEIGHT);

  const dataRows = data.map(({ rate }) =>
    Math.round((rate / MAX_VAL) * HEIGHT),
  );
  // Find indices of highest and lowest data points

  // Build chart as array of arrays of React nodes
  const lines: React.ReactNode[][] = Array.from(
    { length: HEIGHT + 1 },
    (_, i) => {
      const row = HEIGHT - i;
      const yVal = (row / HEIGHT) * MAX_VAL;
      const showLabel = Number.isInteger(yVal);
      const yLabel = showLabel ? yVal.toFixed(1).padStart(3) : "   ";
      const isTarget = row === targetRow;

      const line: React.ReactNode[] = [yLabel, "|"];

      for (let j = 0; j < data.length; j++) {
        if (dataRows[j] === row) {
          let asterisk: React.ReactNode = "*";
          // Color by threshold
          if (data[j].rate >= TARGET) {
            asterisk = (
              <span style={{ color: "green" }} key={`g${i}-${j}`}>
                *
              </span>
            );
          } else {
            asterisk = (
              <span style={{ color: "red" }} key={`r${i}-${j}`}>
                *
              </span>
            );
          }
          if (isTarget) {
            line.push("-");
            line.push(asterisk);
            line.push("--");
          } else {
            line.push(" ");
            line.push(asterisk);
            line.push("  ");
          }
        } else if (isTarget) {
          line.push("----");
        } else {
          line.push("    ");
        }
      }

      return line;
    },
  );

  // Footer lines (plain text)
  const footerLines = [
    ["   +" + "----".repeat(data.length)],
    ["    " + data.map(({ month }) => month.slice(0, 3).padEnd(4)).join("")],
  ];

  return (
    <pre
      style={{
        fontFamily: "monospace",
        fontSize: "0.85rem",
        lineHeight: "1.3",
      }}
    >
      {lines.map((line, idx) => (
        <React.Fragment key={idx}>
          {line}
          {"\n"}
        </React.Fragment>
      ))}
      {footerLines.map((line, idx) => (
        <React.Fragment key={`f${idx}`}>
          {line}
          {"\n"}
        </React.Fragment>
      ))}
    </pre>
  );
}
