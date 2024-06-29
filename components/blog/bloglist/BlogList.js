import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import styled from "styled-components";
import BlogCard from "./blogcard/BlogCard";
import { Spinner2 } from "@/styles/components/spinner";
import { FaLeaf } from "react-icons/fa";

const BlogList = memo(({ data }) => {
  const [activeSort, setActiveSort] = useState("latest");
  const [loading, setLoading] = useState(false);
  const [bloglists, setBlogList] = useState(data.data || []);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const page = useRef(1);

  useEffect(() => {
    setBlogList(data.data);
    setHasMore(data.data.length < data.total);
  }, [data]);

  const fetchMoreBlogs = useCallback(async () => {
    if (loading || !hasMore) return;    
    const nextPageUrl = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/blog_list?page=${page.current + 1}`;
    if (bloglists.length >= data.total) {
      setHasMore(false);
      return;
  }
    try {   
        setLoading(true);
        const response = await fetch(nextPageUrl);
        const newData = await response.json();
        setBlogList((prevBlogLists) => [...prevBlogLists, ...newData.data.data]);
        page.current += 1;
    } catch (error) {
      console.error('Error fetching more blogs:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const handleObserver = (entries) => {
      if (entries[0].isIntersecting) {
        fetchMoreBlogs();
      }
    };

    const currentObserver = new IntersectionObserver(handleObserver, options);
    if (observer.current) {
      currentObserver.observe(observer.current);
    }

    return () => {
      if (observer.current) {
        currentObserver.unobserve(observer.current);
      }
    };
  }, [fetchMoreBlogs]);

  return (
    <Wrapper>
      <Heading className="heading-text">Trending Ideas for making your wedding boom!</Heading>
      <Title activeSort={activeSort}>{activeSort === "latest" ? "Latest Posts" : "Popular Posts"}</Title>
      <SortBy>
        Sort By:
        <SortOption className={activeSort === "latest" ? "active" : ""} onClick={() => setActiveSort("latest")}>Latest</SortOption> |
        <SortOption className={activeSort === "popular" ? "active" : ""} onClick={() => setActiveSort("popular")}>Popular</SortOption>
      </SortBy>
      <BlogListing>
        {bloglists.map((post, index) => (
          <BlogCard key={index} {...post} />
        ))}
        {hasMore && !loading && <div ref={observer}></div>}
      </BlogListing>
      {loading && <Spinner2 style={{ textAlign: "center", marginTop: "1rem" }} />}
      {!hasMore && <center style={{ fontSize: "1.5rem", marginTop: "1rem" }}>You have seen it all</center>}
    </Wrapper>
  );
});

BlogList.displayName = "BlogList";
export default BlogList;

const Wrapper = styled.div`
  text-align: center;
  padding: 20px;
`;

const Heading = styled.h1`
  text-transform: capitalize;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  font-size: ${(props) => (props.activeSort ? "2rem" : "1.5rem")};
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
  &:before, &:after {
    content: "";
    position: absolute;
    top: 50%;
    width: ${(props) => (props.activeSort ? "45%" : "40%")};
    height: 1px;
    background: #ccc;
  }
  &:before {
    left: -55%;
  }
  &:after {
    right: -55%;
  }
`;

const SortBy = styled.div`
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
`;

const SortOption = styled.div`
  margin: 0 10px;
  cursor: pointer;
  &.active {
    color: red;
    font-weight: bold;
  }
  &:not(.active) {
    color: #555;
  }
  &:hover {
    color: red;
  }
`;

const BlogListing = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
