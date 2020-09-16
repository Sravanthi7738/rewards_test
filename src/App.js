import React from "react";
import logo from "./logo.svg";
import "./App.css";
import data from "./data/dataset.json";
import Item from "./Item";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { transactions: [] };
  }

  calculateRewardPoints(amount) {
    if (amount > 100) {
      return (amount - 100) * 2 + 1 * 50;
    } else if (amount <= 100 && amount > 50) {
      return 50;
    } else {
      return 0;
    }
  }

  componentDidMount() {
    let total = 0;
    const sorted = data.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    let byMonth = {};
    let previousMonth;
    sorted.forEach((item) => {
      const month = item.date.substring(5, 7);

      if (typeof byMonth[month] === "undefined") {
        let totalObj = {
          total: total,
        };
        if (byMonth[previousMonth]) {
          total = 0;
          byMonth[previousMonth].push(totalObj);
        }
        byMonth[month] = [];
      }

      previousMonth = month;
      item["rewards"] = this.calculateRewardPoints(item.amount);
      total += item.rewards;
      byMonth[month].push(item);
    });
    let totalObj = { total: total };
    byMonth[previousMonth].push(totalObj);
    this.setState({
      transactions: byMonth,
    });
  }

  render() {
    const { transactions } = this.state;
    return (
      <div>
        <Item transactions={transactions} />;
      </div>
    );
  }
}

export default App;
