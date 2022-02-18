import React, { Dispatch, SetStateAction } from 'react';
import * as S from './Style';
import { Tag } from '@components/base';
import { Item } from '@types';

interface TagListProps {
  supplementInfo?: Item[];
  setCheckedBrand: Dispatch<SetStateAction<string>>;
}

const TagList = ({ supplementInfo, setCheckedBrand }: TagListProps) => {
  const tagList: string[] = [];

  if (supplementInfo) {
    supplementInfo.forEach((item: Item) => {
      const brand = item.브랜드;

      if (brand && tagList.indexOf(brand) < 0) {
        tagList.push(brand);
      }
    });
  }

  return (
    <S.TagList>
      {tagList.length > 0 &&
        React.Children.toArray(
          tagList.map((item) => (
            <Tag item={item} setCheckedBrand={setCheckedBrand} />
          ))
        )}
    </S.TagList>
  );
};

export default TagList;