import styled from "styled-components";

const CreateForm = styled.form`
  margin-bottom: 10em;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 500px;
  max-width: 100%;
  padding: 0px 3em;
  justify-content: space-between;
  

  input {
    width: calc(100% - 90px);
    height:42px;
    padding: 1em;
    border-radius:0.3em;
    border: transparent;
    background-color: ${(props) => props.theme.inputBg};
    border: 1px solid #cccccc;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
    &:focus {
      outline:none;
    }
  }

  button {
    height: 42px;
    padding: 0 1em;
    background-color:rgba(255, 107, 129,1.0);
    border:none;
    color: white;
    cursor:pointer;
    border-radius:0.3em;
    font-weight:bold;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    &:hover{
      background-color:#dc5b6f;
    }
  }
`;

const CreateBoardForm = () => {
  return (
    <CreateForm>
      <input type="text" placeholder="보드 이름을 작성하세요." />
      <button>보드 추가</button>
    </CreateForm>
  );
}

export default CreateBoardForm;