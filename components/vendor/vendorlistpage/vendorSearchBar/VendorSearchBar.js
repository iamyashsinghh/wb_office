import { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import { useRouter } from "next/router";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

// Adjusted Styled components
const Container = styled.div`
  position: absolute;
  padding-left: 25rem;
  top: 48%;
  left: 85%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  .autosuggest-input {
    width: 42rem;
    margin-left: -40rem;
    padding: 2rem 0rem 2rem 1.5rem;
    border: 2px solid #bf9539;
  }

  .search-icon {
    position: absolute;
    display: flex;
    align-items: center;
    margin-right: 3rem;
    color: black;
    font-size: 15px;
    cursor: pointer;
  }

  @media (max-width: 550px) {
    display: none;
  }

  @media (max-width: 1000px) {
    top: 70%;
    transform: translate(-61%, -50%);
    width: 40%;

    .autosuggest-input {
      width: 42rem;
      right: -5%;
      font-size: 12px;
      padding: 1rem 0rem 1rem 2.5rem;
    }

    .search-icon {
      position: absolute;
      font-size: 15px;
      color: black;
    }
  }
`;

const SuggestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: -15rem;
  width: 155%;
  max-height: 200px; /* Adjust this value as needed */
  background-color: #fff;
  border: 2px solid #bf9539;
  border-top: none;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

const Suggestion = styled.div`
  font-size: 15px;
  padding: 10px 10px 10px 2.5rem;
  cursor: pointer;
  &:hover {
    background-color: #bf9539;
  }
`;

// Main SearchBar component
const VendorSearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  // Fetch suggestions on component mount
  useEffect(() => {
    fetchSuggestions();
  }, []);

  // Fetch suggestions from server
  const fetchSuggestions = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/get_all_vendors`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setSuggestionsList(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Filter suggestions based on input value
  const getSuggestions = (inputValue) => {
    const inputValueTrimmed = inputValue.trim().toLowerCase();
    return suggestionsList.filter(
      (suggestion) =>
        suggestion.brand_name &&
        suggestion.brand_name.toLowerCase().includes(inputValueTrimmed)
    );
  };

  // Handle input change
  // Handle input change
  // Handle input change
 // Handle input change
const onChange = (event, { newValue }) => {
  setInputValue(newValue);

  // Filter suggestions based on input value
  const newSuggestions = getSuggestions(newValue);
  if (newSuggestions.length === 0) {
    // If there are no suggestions, display a message
    setSuggestionsList([{ brand_name: "No suggestions found" }]);
  } else {
    setSuggestionsList(newSuggestions);
  }
};


  // Handle suggestion selection
  const onSuggestionSelected = (_, { suggestion }) => {
    setInputValue(suggestion.brand_name);
    const slug = suggestion.brand_name
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase();
    const url = `/${slug}`;
    router.push(url);
    setShowSuggestions(false);
  };
  const renderSuggestion = (suggestion) => {
    if (suggestionsList.length === 0) {
      // If there are no suggestions, display a message
      return <Suggestion>No suggestions found</Suggestion>;
    } else {
      // If there are suggestions, render the suggestion
      return <Suggestion>{suggestion.brand_name}</Suggestion>;
    }
  };
  

  // Input properties for Autosuggest component
  const inputProps = {
    placeholder: "Search for MakeUp Artist, Mehndi, Photographer, etc..",
    value: inputValue,
    onChange: onChange,
    className: "autosuggest-input",
  };

  return (
    <Container>
      <FaSearch className="search-icon" />
      <Autosuggest
        suggestions={suggestionsList}
        onSuggestionsFetchRequested={() => setShowSuggestions(true)}
        onSuggestionsClearRequested={() => setShowSuggestions(false)}
        getSuggestionValue={(suggestion) => suggestion.brand_name}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={onSuggestionSelected}
        renderSuggestionsContainer={({ containerProps, children }) => (
          <SuggestionsContainer {...containerProps}>
            {showSuggestions && children}
          </SuggestionsContainer>
        )}
      />
    </Container>
  );
};

export default VendorSearchBar;
