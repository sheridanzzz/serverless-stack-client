import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import "./Search.css";
import { Storage } from "aws-amplify";
import {useFormFields} from "../libs/hooksLib";
import search from "../search.svg";

export default function Search() {
  const [tags, setTags] = useState("");
  const [showResults, setShowResults] = React.useState(false)
  const [isLoading, setIsLoading] = useState(true);
    const [content, setContent] = useState("");
  const { isAuthenticated } = useAppContext();
  const [fields, handleFieldChange] = useFormFields({
    searchText: "",
  });

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            const tags = await loadTags({ content });
            setTags(tags);
            setShowResults(true)
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

  function loadTags() {
      return API.get("searchTags", "/?tags=" , {
          queryStringParameters: {
              name: content,
          },
      });
  }


  function validateForm() {
    return  content.length > 0;
  }

  function renderTagsList(tags) {
      return tags.LINKS.map((tag, i) =>(
            <ListGroupItem>
                {tag}
                {/*<img src= {tag}*/}
                {/*     alt={tag}/>*/}
            </ListGroupItem>
        )
    );
  }

  function renderNotes() {
    return (
        <div className="tags">
          <PageHeader>Results</PageHeader>
          <ListGroup>
            {renderTagsList(tags)}
          </ListGroup>
        </div>
    );
  }

  return (
      <div className="Search">
        <form onSubmit={handleSubmit}>
            <div className="image" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <img src={search} alt="login" height="20%" width="20%" alignItems="center"/>
            </div>
          <FormGroup controlId="content" bsSize="large">
            <ControlLabel>Search</ControlLabel>
            <FormControl
                autoFocus
                type="search"
                value={content}
                onChange={e => setContent(e.target.value)}
            />
          </FormGroup>
          <Button block bsSize="large" disabled={!validateForm()} type="submit">
            Search
          </Button>
        </form>
          {showResults  ? renderNotes() : null}
      </div>
  );
}