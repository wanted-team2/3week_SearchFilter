import {
  PaginationWrapper,
  TagList,
  MainBox,
  Header,
} from '@components/domain';
import { resultFilter } from '@utils/functions';
import { IMockData } from '@types';
import { useEffect, useState } from 'react';
import * as S from './Style';

interface MainProps {
  data: IMockData[];
}

const Main = ({ data }: MainProps) => {
  const [userInput, setUserInput] = useState('');
  const [userSelect, setUserSelect] = useState<boolean>(true);
  const [checkedBrand, setCheckedBrand] = useState('');
  const [temporaryBrand, setTemporaryBrand] = useState('');
  const [filteredList, setFilteredList] = useState<IMockData[]>([]);
  const [temporaryList, setTemporaryList] = useState<IMockData[]>([]);

  const initFilteredList = () => {
    setFilteredList(data);
  };

  useEffect(() => {
    initFilteredList();
  }, [data]);

  useEffect(() => {
    const results: IMockData[] = userSelect
      ? resultFilter(data, '제품명', userInput)
      : resultFilter(data, '브랜드', userInput);
    results && setFilteredList(results);
  }, [userInput]);

  useEffect(() => {
    if (!checkedBrand) {
      setFilteredList(data);
      return;
    }

    if (temporaryBrand !== '') {
      const results: IMockData[] = resultFilter(
        temporaryList,
        '브랜드',
        checkedBrand
      );
      results && setFilteredList(results);
    } else {
      const results: IMockData[] = resultFilter(
        filteredList,
        '브랜드',
        checkedBrand
      );

      if (results) {
        setTemporaryBrand(checkedBrand);
        setTemporaryList(filteredList);
        setFilteredList(results);
      }
    }
  }, [checkedBrand]);

  return (
    <S.PageWrapper>
      <Header
        userSelect={userSelect}
        setUserInput={setUserInput}
        setUserSelect={setUserSelect}
        initFilteredList={initFilteredList}
      />
      <TagList supplementInfo={data} setCheckedBrand={setCheckedBrand} />
      <MainBox items={filteredList} />
      <PaginationWrapper list={filteredList} />
    </S.PageWrapper>
  );
};

export default Main;
