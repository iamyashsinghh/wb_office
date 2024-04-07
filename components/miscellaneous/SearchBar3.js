import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const Container = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 8;

  ${
    "" /* .search-btn {
    background: white;
    display: flex;
    justify-content: center;
    position: relative;
    right: 52px;
    align-items: center;
    padding: 1.6rem;
    cursor: pointer;
    border-top-right-radius: 25px;
    ${"" /* border-bottom-right-radius: 25px; */
  }

  .search-icon {
    position:absolute;
    display:flex;
    align-items:center;
    color: #fff;
    font-size: 25px;
    top:29%;
    right:2%;
    cursor:pointer;

  }
  .autosuggest-input {
    position: relative;
    border: none;
    background: white;
    width: 700px;
    height: 6rem;
    padding: 2.5rem;
    margin: auto;
    outline: none;
    font-size: 16px;
    ${"" /* border-radius: 25px; */}
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
    border-bottom-left-radius: ${({ showSuggestions }) =>
      showSuggestions ? "0" : "25px"};
    border-bottom-right-radius: ${({ showSuggestions }) =>
      showSuggestions ? "0" : "25px"};
    font-family: "Work Sans", sans-serif;
  }
  @media (max-width: 1000px) {
    ${"" /* display:none; */}
    top: 70%;
    ${"" /* left: 46%; */}
    transform: translate(-61%, -50%);
    width: 40%;
    ${"" /* display:none; */}
    .autosuggest-input {
      width: 42rem;
      right: -5%;
      font-size: 12px;
      padding: 1rem 0rem 1rem 2.5rem ;
    }
    ${
      "" /* .search-btn {
      border-top-right-radius: 25px;
      border-bottom-right-radius: 25px;
      position: relative;
      right: 11.3%;
      padding: 2rem 1.5rem;
    } */
    }
    .search-icon {
      color: #fff;
      font-size: 15px;
      cursor:pointer;
      right:-50%;
      top:35%;
      cursor:pointer;
      
    }
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 25px;
  font-size: 16px;
`;

const SuggestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
  overflow-y: auto;
  @media (max-width: 768px) {
    ${"" /* display:block; */}
    margin-left: 15.5px;
    ${"" /* border-top:0px solid black; */}
    ${"" /* border-bottom:1px solid #bf9539; */}
    border-right:1px solid #bf9539;
    border-left: 1px solid #bf9539;
    border-bottom: ${({ showSuggestions }) =>
      showSuggestions ? "1px solid #bf9539" : "none"};
  }
`;

const Suggestion = styled.div`
  z-index: 5;
  font-size: 15px;
  padding: 10px 10px 10px 2.5rem;
  cursor: pointer;
  &:hover {
    background-color: #bf9539;
  }
`;

const SearchBar3 = ({
  suggestions,
  selectedCity,
  venueObject,
  vendorObject,
  allVenues,
  allVenuesSlug,
}) => {
  const [value, setValue] = useState("");
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const router = useRouter();
  const inputRef = useRef(null);

  // useEffect(() => {
  //   // Assuming you have a ref set up for your input
  //   inputRef.current.focus();
  // }, []);

  const searchHandler = () => {
    onSuggestionsClearRequested();
    if (value == "5 Start Wedding Hotels") {
      setValue("5 Star Wedding Hotels");
    }
    if (value == "Wedding Transportation / Vintage Cars") {
      setValue("Wedding Transportation And Vintage Cars");
    }
    if (value == "Makeup Artists") {
      setValue("Top Makeup Artists");
    }
    if (value == "Mehndi Artists") {
      setValue("Best Mehndi Artists");
    }
    var pattern = /[^a-zA-Z0-9]/g;
    const slug = value.replaceAll(pattern, "-");
    console.log(slug);
    const url = `/${slug}/${selectedCity}/all`;
    value ? router.push(url) : <div></div>;
  };

  const onBlurHandler = () => {
    setIsInputFocused(false);
    setTimeout(() => {
      if (!isInputFocused) {
        // Check if input is not focused before clearing suggestions
        onSuggestionsClearRequested();
      }
    }, 100);
  };
  const onFocusHandler = () => {
    setIsInputFocused(true);
    onSuggestionsFetchRequested({ value: "" });
  };

  const onSuggestionClick = (suggestion) => {
    setShowSuggestions(false);
    if (suggestion == "5 Start Wedding Hotels") {
      suggestion = "5 Star Wedding Hotels";
    }
    if (suggestion == "Wedding Transportation / Vintage Cars") {
      suggestion = "Wedding Transportation And Vintage Cars";
    }
    if (suggestion == "Photographers / Videography") {
      suggestion = "Best Wedding Photographers";
    }
    if (suggestion == "Makeup Artists") {
      suggestion = "Top Makeup Artists";
    }
    if (suggestion == "Mehndi Artists") {
      suggestion = "Best Mehndi Artists";
    }
    // console.log(venueObject);
    let matchedVenue = null;
    let matchedVendor = null;
    let venueMatchedSlug = null;
    let vendorMatchedSlug = null;
    venueObject.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        if (key.toLowerCase() == suggestion.toLowerCase()) {
          matchedVenue = key;
          venueMatchedSlug = obj[matchedVenue];
        }
      });
    });
    vendorObject.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        if (key.toLowerCase() == suggestion.toLowerCase()) {
          matchedVendor = key;
          venueMatchedSlug = obj[matchedVendor];
        }
      });
    });
    if (venueMatchedSlug) {
      const url = `/${selectedCity}/${venueMatchedSlug}`;
      router.push(url);
    } else if (vendorMatchedSlug) {
      const url = `/${selectedCity}/${vendorMatchedSlug}`;
      router.push(url);
    } else {
      var pattern = /[^a-zA-Z0-9]/g;
      const slug = suggestion.toLowerCase().replaceAll(pattern, "-");

      const url = `/${slug}/${selectedCity}/all`;
      router.push(url);
    }
  };

  function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const getSuggestions = (inputValue) => {
    const inputValueTrimmed = inputValue.trim();
    // Check if the inputValue is empty, return suggestions for "a"
    if (inputValueTrimmed === "") {
      return suggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith("a")
      );
    }
    const inputValueLowerCase = inputValueTrimmed.toLowerCase();
    return suggestions.filter(
      (suggestion) => suggestion.toLowerCase().indexOf(inputValueLowerCase) > -1
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    //slicing 5 suggestion
    setSuggestionsList(getSuggestions(value || "a").slice(0, 100));
    // console.log(suggestionsList, "set");
    setShowSuggestions(true);
  };
  const debouncedFetchSuggestions = debounce(onSuggestionsFetchRequested, 800);

  const renderSuggestionsContainer = ({ containerProps, children }) => {
    const { ref, ...restContainerProps } = containerProps;
    const noSuggestions =
      suggestionsList.length === 0 && value.trim() !== "" && isInputFocused;

    return (
      <SuggestionsContainer
        {...restContainerProps}
        ref={ref}
        showSuggestions={showSuggestions}
      >
        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
          {showSuggestions && noSuggestions && (
            <div
              style={{
                padding: "10px",
                fontSize: "18px",
                color: "#808080",
                textAlign: "center",
              }}
            >
              No match found
            </div>
          )}
          {!noSuggestions && children}
        </div>
      </SuggestionsContainer>
      
    );
  };

  const onSuggestionHighlighted = ({ suggestion }) => {
    if (!suggestion) return;

    const suggestionElement = document.querySelector(
      `.suggestion-${suggestionsList.indexOf(suggestion)}`
    );
    if (suggestionElement) {
      suggestionElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestionsList([]);
    setShowSuggestions(false);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setValue(suggestion);
  };

  const onChange = (event, param) => {
    const { newValue = "" } = param || {};
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Search for Banquet Halls, Photographer, etc..",
    value,
    onChange,
    onFocus: onFocusHandler,
    onBlur: onBlurHandler,
    ref: inputRef,
    className: "autosuggest-input",
    onKeyPress: (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        searchHandler();
      }
    },
  };

  return (
    <Container showSuggestions={showSuggestions}>
      <Autosuggest
        suggestions={suggestionsList}
        onSuggestionsFetchRequested={debouncedFetchSuggestions}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        onSuggestionHighlighted={onSuggestionHighlighted}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={(suggestion, { query, isHighlighted }) => (
          <Suggestion
            className={`suggestion-${suggestionsList.indexOf(suggestion)}`}
          >
            {suggestion}
          </Suggestion>
        )}
        shouldRenderSuggestions={() => true}
        inputProps={inputProps}
        onSuggestionSelected={(_, { suggestion }) =>
          onSuggestionClick(suggestion)
        }
        theme={{
          container: {
            position: "relative",
          },
          suggestionsContainer: {
            position: "absolute",
            top: "95%",
            left: 0,
            width: "100%",
            // marginLeft: "12px",
            border: "1px solid none",
            backgroundColor: "#fff",
            zIndex: 9999,
          },
          suggestionHighlighted: {
            backgroundColor: "#bf9539",
          },
        }}
      />
      <div className="search-btn" onClick={searchHandler}>
        <FaSearch color="var(--secoundary-color)" className="search-icon" />
      </div>
    </Container>
  );
};
export default SearchBar3;
