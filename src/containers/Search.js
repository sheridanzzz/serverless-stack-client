import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Image } from "react-bootstrap";
import { PageHeader, ListGroup, ListGroupItem, Alert } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import "./Search.css";
import {useFormFields} from "../libs/hooksLib";
import search from "../search.svg";
import { S3Image } from 'aws-amplify-react';
import LoaderButton from "../components/LoaderButton";

export default function Search() {
  const [tags, setTags] = useState("");
  const [showResults, setShowResults] = React.useState(false)
  const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading(false);
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
        if (tags.LINKS && tags.LINKS.length === 0)
        {
            return <h4>No Results Found! </h4>
        } else {
            return tags.LINKS.map((tag, i) => (
                //fluid for scaling img big
                    <ListGroupItem>
                        <S3Image imgKey={tag.split('/')[4]} theme={{ photoImg: { width: '300px', height: '300px' } }}/>
                        <br />
                        <Alert variant= 'light'>
                        Link - <a href={{tag}}>{tag}</a>
                        </Alert>

                    </ListGroupItem>
                )
            );
        }
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
            <LoaderButton
                block
                bsStyle="primary"
                type="submit"
                bsSize="large"
                isLoading={isLoading}
                disabled={!validateForm()}
            >
                Search
            </LoaderButton>
        </form>
          {showResults  ? renderNotes() : null}
      </div>
  );
}