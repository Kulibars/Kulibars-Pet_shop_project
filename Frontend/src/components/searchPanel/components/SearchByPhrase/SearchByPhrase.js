import styled from "styled-components";
import { Input } from "../../../input/input";
import { Icon } from "../../../icon/icon";

const SearchByPhraseContainer = ({
  className,
  borderradius,
  searchPhrase,
  onChange,
}) => {
  return (
    <div className={className}>
      <Input
        borderradius={borderradius}
        value={searchPhrase}
        placeholder="Поиск по заголовкам"
        onChange={onChange}
      />
      <Icon id="fa fa-search" margin="1px 7px 0 0" size="21px" />
    </div>
  );
};
export const SearchByPhrase = styled(SearchByPhraseContainer)`
  display: flex;
  position: relative;
  width: 400px;
  height: 40px;
  margin: 0px auto 40px;

  & > div {
    position: absolute;
    right: 9px;
    top: 3px;
    margin: 5px 7px 0 0;
  }

  & > input {
    padding: 10px 32px 10px 10px;
  }
`;
