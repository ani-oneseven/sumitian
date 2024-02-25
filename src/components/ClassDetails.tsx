import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { View } from './Themed';
import { SelectList } from 'react-native-dropdown-select-list';
import Colors from '@/constants/Colors';

// Define the type for standard
type Standard = { key: string; value: string };

const standard: Standard[] = [
  { key: 'nine', value: 'IX' },
  { key: 'ten', value: 'X' },
  { key: 'eleven', value: 'XI' },
  { key: 'twelve', value: 'XII' }
];

// Define the types for subject and chapter
type Subject = { key: string; value: string }[];
type Chapter = { key: string; value: string }[];

// Define the type for the subject object
type SubjectObject = {
  [key: string]: Subject;
};

// Define the type for the chapter object
type ChapterObject = {
  [key: string]: Chapter;
};

// Define the subject object
const subject: SubjectObject = {
  'nine': [
    { key: '091', value: 'Physics' },
    { key: '092', value: 'Chemistry' },
    { key: '093', value: 'Maths' },
    { key: '094', value: 'Bio' },
  ],
  'ten': [
    { key: '101', value: 'Physics' },
    { key: '102', value: 'Chemistry' },
    { key: '103', value: 'Maths' },
    { key: '104', value: 'Bio' },
  ],
  'eleven': [
    { key: '111', value: 'Maths' },
    { key: '112', value: 'Accounts' },
  ],
  'twelve': [
    { key: '121', value: 'Maths' },
    { key: '122', value: 'Accounts' },
    { key: '123', value: 'Bio' },
  ]
};

// Define the chapter object
const chapter: ChapterObject = {
  '091': [
    { key: '091001', value: 'Light-1' },
    { key: '091002', value: 'Light-2' },
    { key: '091003', value: 'Electricity-1' },
    { key: '091004', value: 'Electricity-2' },
  ],
  '103': [
    { key: '103001', value: 'real numbers' },
    { key: '103002', value: 'polynomials' },
    { key: '103003', value: 'Linear equation' },
    { key: '103004', value: 'quadratic' },
  ]
};

const ClassDetails: React.FC = (props) => {
  const [standardValue, setStandardValue] = React.useState<string | undefined>();
  const [subjectValue, setSubjectValue] = React.useState<string | undefined>();
  const [chapterValue, setChapterValue] = React.useState<string | undefined>();

  const [selectedDrop, setSelectedDrop] = React.useState<boolean | undefined>();

  return (
    <View style={styles.container}>
      <View style={styles.dropDown}>
        <SelectList
          setSelected={setStandardValue}
          data={standard}
          placeholder='Class'
          search={false}
          dropdownShown={false}
          maxHeight={150}
          boxStyles={styles.list}
          inputStyles={styles.dropDownText}
          dropdownTextStyles={styles.dropDownText}
          dropdownStyles={styles.dropDownBox}
        />
      </View>
      <View style={styles.dropDown}>
        {subject[standardValue] && (
          <SelectList
            setSelected={(val) => setSubjectValue(val)}
            data={subject[standardValue]}
            placeholder='Subject'
            search={false}
            dropdownShown={false}
            maxHeight={150}
            boxStyles={styles.list}
            inputStyles={styles.dropDownText}
            dropdownTextStyles={styles.dropDownText}
            dropdownStyles={styles.dropDownBox}
          />
        )}
       </View>
       <View style={styles.dropDown}>
        {subjectValue && chapter[subjectValue] && (
          <SelectList
            setSelected={setChapterValue}
            data={chapter[subjectValue]}
            placeholder='Chapter'
            search={false}
            dropdownShown={false}
            maxHeight={150}
            boxStyles={styles.list}
            inputStyles={styles.dropDownText}
            dropdownTextStyles={styles.dropDownText}
            dropdownStyles={styles.dropDownBox}
          />
        )}
        </View>     
    </View>
  );
};

ClassDetails.propTypes = {};

export default ClassDetails;

const styles = StyleSheet.create({
    container: {
      paddingVertical: 10,
      flexDirection: 'row',
      elevation: 2,
      shadowColor: Colors.light.background,
    },
    dropDown: {
        padding: 5,
        flex: 1,
        elevation: 3,
        shadowColor: Colors.light.background,
    },
    list: {
        borderRadius: 10, 
        height: 45, 
        backgroundColor: Colors.light.background,
        borderColor: Colors.light.tint
    },
    dropDownText: {
        fontWeight: '500',
        fontSize: 12, 
        color: Colors.light.text,
    },
    dropDownBox: {
      backgroundColor: Colors.light.background,
      borderColor: Colors.light.tint
    }
  });
  