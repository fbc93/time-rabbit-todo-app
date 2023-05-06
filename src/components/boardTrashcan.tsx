import styled from "styled-components";

const TrashCan = styled.div`
  background-color:rgba(255, 99, 72,1.0);
  border:none;
  color: white;
  cursor:pointer;
  padding:2em;
  margin:3em;
  transition: background-color 0.2s ease-in-out;
  border-radius:50%;
  opacity:1;

  position: fixed;
  bottom: 0;
  z-index: 100;
  right: 0;

  span {
    font-size:4rem;
  }
`;


const BoardTrashCan = () => {
  return (
    <TrashCan>
      <span className="material-symbols-rounded">
        delete
      </span>
    </TrashCan>
  )
}

export default BoardTrashCan;