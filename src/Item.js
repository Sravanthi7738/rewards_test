import React from "react";

function Item(props) {
  const { transactions } = props;
  return (
    <div>
      <table>
        <caption> Rewards List </caption>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Price</th>
            <th>Rewards</th>
          </tr>
          {Object.values(transactions).map((obj) => {
            return obj.map((item, index) => {
              return item.total ? (
                <tr>
                  <td class="total" colspan="3" align="right">{item.total}</td>
                </tr>
              ) : (
                <tr>
                  <td>{item.date}</td>
                  <td  align="right">{item.amount}</td>
                  <td  align="right">{item.rewards}</td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Item;
