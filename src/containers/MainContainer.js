import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  state = {
    stocks: [], //this is our initial stocklist
    portfolioStocks: [], //this is the list of stocks we want to add to our portfolio
    searchTerm: "",
  };
  componentDidMount() {
    fetch("http://localhost:3000/stocks")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          stocks: data,
        });
      });
  }

  buyStock = (stock) => {
    console.log("This stock was bought! ", stock);
    this.setState({
      portfolioStocks: [...this.state.portfolioStocks, stock],
    });
  };

  sellStock = (soldStock) => {
    // console.log("this stock must be sold ", stock)
    this.setState({
      portfolioStocks: this.state.portfolioStocks.filter(
        (stock) => stock.id != soldStock.id
      ),
    });
  };

  handleSearch = (e) => {
    console.log(e.target.value);
    let { value } = e.target;
    this.setState({
      searchTerm: value,
      filteredStocks: this.state.stocks.filter((stock) =>
        stock.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      )
    });
  };

  render() {
    return (
      <div>
        <SearchBar handleSearch={this.handleSearch} />

        <div className="row">
          <div className="col-8">
            <StockContainer
              stocks={
                this.state.searchTerm.length > 0
                  ? this.state.filteredStocks
                  : this.state.stocks
              }
              buyStock={this.buyStock}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              pStocks={this.state.portfolioStocks}
              sellStock={this.sellStock}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
