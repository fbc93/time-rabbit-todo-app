import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { BoardState } from "../atoms";

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
    &:disabled{
      opacity:0.5;
    }
    &:hover{
      background-color:#dc5b6f;
    }
  }
`;

interface FormData {
  title: string;
}

const CreateBoardForm = () => {

  const [boardsData, setBoardData] = useRecoilState(BoardState);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>();

  const onValidData = ({ title }: FormData) => {

    setBoardData((prevBoards) => {
      const copyPrevBoards = [...prevBoards];

      if (title) {
        const newBoard = {
          id: +new Date(),
          title: title,
          toDos: [
            {
              id: +new Date(),
              content: "투두를 작성해보세요."
            }
          ]
        }

        return [...copyPrevBoards, newBoard]
      }
      return copyPrevBoards;
    });

    setValue("title", "");
  }

  return (
    <CreateForm onSubmit={handleSubmit(onValidData)}>
      <input
        {...register("title", { required: "보드 이름을 반드시 작성하여 추가하세요." })}
        type="text"
        placeholder={errors.title?.message ? errors.title?.message + "" : "보드 이름을 작성하세요."}
      />
      <button disabled={watch("title") === "" ? true : false}>보드 추가</button>
    </CreateForm>
  );
}

export default CreateBoardForm;