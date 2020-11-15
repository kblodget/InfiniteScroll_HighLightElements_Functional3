import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { loremIpsum } from "lorem-ipsum";
import Collapsible from "react-collapsible";
import "./styles.css";
import logo from "./logo.svg";
import randomColor from "randomcolor";

import Icon from "./icon/Message";

const rowCount = 20;
//class App extends Component {
const App = () => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  let elementMap = new Map();

  const list = Array(rowCount)
    .fill()
    .map((val, idx) => {
      return {
        id: idx,
        name: "John Doe",
        image: "http://via.placeholder.com/40",
        icon: "message",
        elements: [
          {
            updatedTime: "11 Nov. 2020"
          },
          {
            poc: "djdkdk"
          },
          {
            color: "silver"
          }
        ],
        text: loremIpsum({
          count: 1,
          units: "sentences",
          sentenceLowerBound: 4,
          sentenceUpperBound: 50
        })
      };
    });
  //}
  function highlightElement(elem) {
    console.log("key ", elem);
    console.log(elementMap.has(elem));
    if (!elementMap.has(elem)) {
      elementMap.set(elem, true);
      return "highlight-element";
    }
    return "";
  }

  const renderRow = (item) => {
    return (
      <div key={item.id} className="row">
        <div className="content">
          <span className="image">
            <Icon name="message" width={25} fill={randomColor()} />
          </span>
          <span>
            {item.name} {item.id}
          </span>

          <div>{item.elements.map(renderElements)} </div>

          <Collapsible
            transitionTime={400}
            trigger="Open Dialog"
            triggerWhenOpen="Plus you can change the trigger text when I'm open too"
          >
            <div>{item.text}</div>
          </Collapsible>
        </div>
      </div>
    );
  };

  const renderElements = (elem, elemIndex) => {
    const elemKey = Object.keys(elem)[0];
    const elemValue = elem[elemKey];
    console.log(elemValue);
    return (
      <div key={elemIndex}>
        <span className={highlightElement(elemKey)}>{elemKey}</span>
        <span>
          {":  "} {elemValue}
        </span>
      </div>
    );
  };

  const handleInfiniteOnLoad = () => {};

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h1 className="App-title">Details List</h1>
      </header>
      <InfiniteScroll
        pageStart={1}
        loadMore={handleInfiniteOnLoad}
        hasMore={!loading && hasMore}
        useWindow={false}
      >
        <div className="list">{list.map(renderRow)}</div>
      </InfiniteScroll>
    </div>
  );
};
export default App;
