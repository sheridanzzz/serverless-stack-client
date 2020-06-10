import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Search.css";

export default function Search() {
  const [search, setSearch] = useState("");

  function validateForm() {
    return search.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Search">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="search" bsSize="large">
          <ControlLabel>Search</ControlLabel>
          <FormControl
            autoFocus
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Search
        </Button>
      </form>
    </div>
  );
}