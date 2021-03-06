import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import './FormAddEdit.scss';


const Overlay = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0,0,0,0.5);
	z-index: 1;
	display: flex;
	justify-content: center;
	align-items: center;
`;


export default function FormAddEdit({isOpen, data, setData, onOk, onCancel}) {
	if (!isOpen) {return null;}

	return ReactDOM.createPortal(
		<Overlay>
			<form className="add-edit" onSubmit={handleSubmit}>
				<div className="for-field">
					<label htmlFor="description">Description:</label>
					<input autoFocus type="text" name="description" id="description"
						value={data.description}
						onChange={handleDescriptionChange}
						onKeyPress={handleKeyPress}
					/>
				</div>
				<div className="for-field">
					<label htmlFor="number">Number:</label>
					<input type="type" pattern="[0-9]+" name="number" id="number"
						value={Number.isNaN(data.number) ? "" : data.number}
						onChange={handleNumberChange}
						onKeyPress={handleKeyPress}
					/>
				</div>
				<div className="for-buttons">
					<button type="button" id="ok" onClick={handleOk}>Ok</button>
				</div>
				<div className="close-button" onClick={onCancel}/>
			</form>
		</Overlay>,
		document.getElementById("portalAddEditModal")
	);

	
	// TODO: add some input checks and errors display
	function handleDescriptionChange(event) {
		setData(x => ({...x, description: event.target.value}));
	}

	function handleNumberChange(event) {
		setData(x => ({...x, number: parseInt(event.target.value)}));
	}

	function handleOk() {
		if (data.description.length === 0) {return;}
		if (Number.isNaN(data.number) || data.number === 0) {return;}
		onOk();
	}

	function handleSubmit(event) {
		event.preventDefault();
		handleOk();
	}

	function handleKeyPress(event) {
		if (event.key === "Enter") {
			handleOk();
		}
	}
}

