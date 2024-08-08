import React, { useState } from 'react';
import { Form, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProjectSelector = () => {
  const [selectedProject, setSelectedProject] = useState('Selecione um Projeto');

  const handleSelect = (eventKey) => {
    setSelectedProject(eventKey);
  };

  return (
    <div>
      <Form.Group controlId="project-select">
        <Form.Label>Selecione um Projeto:</Form.Label>
        <DropdownButton
          id="dropdown-projects"
          title={selectedProject}
          onSelect={handleSelect}
          variant="primary"
        >
          <Dropdown.Item eventKey="Projeto 1">Projeto 1</Dropdown.Item>
          <Dropdown.Item eventKey="Projeto 2">Projeto 2</Dropdown.Item>
        </DropdownButton>
      </Form.Group>

      {selectedProject !== 'Selecione um Projeto' && (
        <div>
          <h2>Você selecionou: {selectedProject}</h2>
        </div>
      )}
    </div>
  );
};

export default ProjectSelector;
