import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { boardTrashcanState } from "../atoms";

const TrashCan = styled.div`
  background-color: rgb(255, 99, 72);
    border: none;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out 0s;
    opacity: 1;
    position: fixed;
    top: -40px;
    z-index: 100;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 2em;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
  

  span {
    font-size:3rem;
  }
`;

interface TrashCanProps {
  refProp: (element: HTMLElement | null) => void;
  droppableProps: any;
}

const BoardTrashCan = ({ refProp, droppableProps }: TrashCanProps) => {

  const BoardTrashcan = useRecoilValue(boardTrashcanState);

  return (
    <>
      {BoardTrashcan && (
        <TrashCan>
          <span className="material-symbols-rounded">
            delete
          </span>
        </TrashCan>
      )}
    </>
  );
}

export default BoardTrashCan;