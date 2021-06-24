import React from "react";
import {
  View,
  Text,
  TouchableNativeFeedback,
  Alert,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";
import DefaultText from "../UI/DefaultText";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { Document } from "./Document";

import { getDocumentAsync } from "expo-document-picker";
import { useDispatch, useSelector } from "react-redux";

import { addDocument, removeDocument as reduxRemoveDocument } from "../../store/actions/documents";

const DocumentPicker = props => {
  const dispatch = useDispatch();

  const documentsList = useSelector(state => state.documents.documents);

  console.log(documentsList)

  const handleDocumentUpload = async () => {
    const documentInfo = await getDocumentAsync();
    if(documentInfo.type !== 'cancel')
      dispatch(addDocument(documentInfo.uri, documentInfo.name));
  };

  const removeDocument = (uri) => {
    dispatch(reduxRemoveDocument(uri));
  };

  const handleDocumentRemove = (uri) => {
    Alert.alert(
      'Убрать документ?',
      'Документ не будет добавлен в заказ на печать',
      [
        { text: 'Убрать', onPress: () => { removeDocument(uri) } },
        { text: 'Отмена' }
      ]
    );
  };

  return (
    <View style={styles.documentPickerContainer}>
      <Text style={styles.uploadPrompt}>Выберите документы: </Text>
      <TouchableNativeFeedback onPress={handleDocumentUpload}>
        <FontAwesome5 name="file-upload" size={36} color={Colors.blue} />
      </TouchableNativeFeedback>

      <View style={styles.uploadedDocumentsContainer}>
        {documentsList.length > 0 &&
          <DefaultText
            style={{ alignSelf: "center", marginBottom: 30, fontSize: 16 }}
          >
            Выбранные документы:
          </DefaultText>
        }
        <FlatList
          data={documentsList}
          keyExtractor={(item, index) => `${item.name}${index}`}
          horizontal
          renderItem={({ item }) => <Document name={item.name} onRemove={() => handleDocumentRemove(item.uri)}/>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  documentPickerContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 14
  },
  uploadedDocumentsContainer: {
    width: "100%",
    paddingVertical: 26
  },
  uploadPrompt: {
    alignSelf: "flex-start",
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginBottom: 24
  },
});

export default DocumentPicker;
