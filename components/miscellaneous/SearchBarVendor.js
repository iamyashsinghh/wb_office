import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  align-items: center;
  z-index: 1;
  margin-right: 15px;
  @media (max-width: 1000px) {
    display: none;
  }

  #react-autowhatever-1{
    position: absolute;
    top: 95%;
    width: calc(100% + 1px);
    left: 0;
    border: 1px solid none;
    background-color: #fff;
    z-index: 9999;
    @media (min-width: 768px) {
      left: 0px !important;
    }
    @media (min-width: 601px) {
      left: -16px;
    }
    @media (max-width: 601px) {
      width: 100%;
      left: -15px;
    }
  }
  .search-icon {
    position: absolute;
    color: #fff;
    font-size: 20px;
    top: 43%;
    right: 2%;
    cursor:pointer;
    @media (max-width: 1142px) {
      top: 43%;
      right: 2%;
    }
    @media (max-width: 1000px) {
      top: 1.32%;
    }
    @media (max-width: 681px) {
      top: 0.77%;
      right: 4%;
    }
    @media (max-width: 341px) {
      top: 0.75%;
      right: 5%;
    }
  }
  .autosuggest-input {
    position: relative;
    border: none;
    background: white;
    border: 1px solid #bf9539;
    width: 400px;
    height: 6rem;
    padding: 2.5rem;
    margin: auto;
    outline: none;
    font-size: 16px;
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
    border-bottom-left-radius: ${({ showSuggestions }) =>
      showSuggestions ? "0" : "25px"};
    border-bottom-right-radius: ${({ showSuggestions }) =>
      showSuggestions ? "0" : "25px"};
    font-family: "Work Sans", sans-serif;
  }
  @media (max-width: 500px) {
      width: 85vw;
  }
  @media (max-width: 768px) {
    .autosuggest-input {
      width: 91vw;
    }
  }
  @media (max-width: 1000px) {
    .autosuggest-input {
      width: 97vw;
      font-size: 12px;
      padding: 1rem 0rem 1rem 2.5rem ;
    }
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
  border-right:1px solid #bf9539;
  border-left: 1px solid #bf9539;
  border-bottom: ${({ showSuggestions }) =>
      showSuggestions ? "1px solid #bf9539" : "none"};
  overflow-y: auto;
  @media (max-width: 768px) {
    margin-left: 15.5px;
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

const SearchBarVendor = ({
  suggestions,
  selectedCity,
  venueObject,
  vendorObject,
  allVenues,
  allVenuesSlug,
  category,
}) => {
  const [value, setValue] = useState("");
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const router = useRouter();
  const inputRef = useRef(null);

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
    setSuggestionsList(getSuggestions(value || "a").slice(0, 100));
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
    placeholder: `Search for ${category.replaceAll("-", " ")}, etc..`,
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
export default SearchBarVendor;
