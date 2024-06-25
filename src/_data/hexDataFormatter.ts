const parties = [
  "con",
  "lab",
  "green",
  "ld",
  "ref",
  "snp",
  "pc",
  "other",
]
export default (data: Record<string, unknown>[]) => {

  const results = data.reduce((a, c) => ({
    ...a,
    [c.winner]: a[c.winner] + 1 || 1
  }), {})

  console.log(results);

  return data.map(c => {
    const sortedResults = Object.entries(c).filter(([key, value]) => {
      // Ignore if value is zero
      if (value === 0) return false;
      // Filtyer out
      if (parties.includes(key)) return true;
      return false;
    }).toSorted((a, b) => b[1] - a[1]);

    const resultTable = sortedResults.map(x =>
      `<tr><td scope="row">${ x[0] }</td><td>${ (x[1] * 100).toFixed(1) }%</td></tr>`
    ).join('')

    return {
      ...c,
      tooltip: `<h1>${c.pcon_nm}</h1><p>Winner: ${ c.winner }</p><table><thead><tr><th scope="column">Party</th><th scope="column">Prediction</th></tr></thead><tbody>${ resultTable }</tbody></table>`
    }
  });
}