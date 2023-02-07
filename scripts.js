const loadData = async () => {
  try {
    const url = `http://substantiveresearch.pythonanywhere.com/`;
    const res = await fetch(url);
    console.log(res.ok);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(`Error -> ${err}`);
  }
};

(async () => {
  const data = await loadData();
  const totalItems = data.length;

  const sectorsList = data.map(element => element.name);
  const uniqueSectorsList = [...new Set(sectorsList)];

  let out = "";
  let placeholder = document.querySelector("#data-output");

  uniqueSectorsList.forEach(currSector => {
    const numItems = sectorsList.filter(sector => sector === currSector);
    console.log(numItems.length);

    let percentages = parseFloat((numItems.length * 100) / totalItems).toFixed(
      2
    );

    console.log(`sector ${currSector} represents ${percentages}%`);

    out += `
    <tr>
      <th>
        ${currSector}
      </th>
      <th>
        ${percentages}%
      </th>
    </tr>
`;
  });

  placeholder.innerHTML = out;
})();
