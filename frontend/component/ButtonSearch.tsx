import { View, Text,Image, TextInput, StyleSheet, ScrollView, TouchableHighlight,FlatList } from 'react-native'
import React from 'react'
import { Searchbar } from 'react-native-paper';
import { useState,useEffect } from 'react';
import { API_KEY } from '../../../API/APi';
import { MasonryFlashList } from "@shopify/flash-list";
import { getColumnCount, wp } from './Common';
import ImageCard from './ImageCard'


const ButtonSearch = () => {
    const [searchQuery, setSearchQuery] = React.useState('');


  const categories = [
    'backgrounds', 'fashion', 'nature', 'science', 'education', 'feelings', 'health', 
    'people', 'religion', 'places', 'animals', 'industry', 'computer', 'food', 
    'sports', 'transportation', 'travel', 'buildings', 'business', 'music'
  ];

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (searchQuery = '') => {
    try {
      setLoading(true);
      const apiUrl = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(searchQuery)}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setImages(data.hits);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchImages(query);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.previewURL }} style={styles.image} />
     
    </View>
  );
  
   const columns = getColumnCount();
  return (
    <ScrollView >
    <View style={styles.container}>
      <Searchbar
      placeholder="Search for photo"
      // onChangeText={setSearchQuery}
      value={query}
      onChangeText={(text) => setQuery(text)}
      onSubmitEditing={handleSearch}
     
    />
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        <View style={styles.flex}>
        {categories.map((category, index) => (
  <TouchableHighlight
    key={index}
    onPress={() => {
      fetchImages(category);
      setQuery(category);
    }}
  >
    <Text style={styles.button}>{category}</Text>
  </TouchableHighlight>
))}

        </View>
      </ScrollView>
      
    
    </View>
    {loading ? (
        <Text style={{fontSize:20,}}>Loading...</Text>
      ) : (
        
           <View style={styles.data}>
        <MasonryFlashList
        data={images}
        numColumns={2}
        
        contentContainerStyle={styles.listContainerStyles}
        renderItem={({item,index})=> <ImageCard  item={item} index={index} columns={columns}/>}
        estimatedItemSize={200}
      />
      </View>
        
      )}
         
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    color: 'gray',
    borderWidth: 2,
    borderColor: 'gray',
    padding: 10,
    margin: 30,
    borderRadius: 20,
  },
  container: {
    backgroundColor: 'ghostwhite',
    padding: 20
  },
  button: {
    margin: 10,
    fontSize: 17,
   backgroundColor:"white",
    padding: 13,
    borderRadius: 13,
    textAlign: 'center',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingVertical: 10,
  },
  item: {
    // marginBottom: 20,
    // alignItems: 'center',
    // flex:1,
    // flexWrap:"wrap",
  },
  image: {
    // width: 150,
    // height: 150,
    // borderRadius:23,
   
  },
  listContainerStyles:{
    paddingHorizontal: wp(4),
  },
  data:{
    minHeight:3,
    width:wp(100)
  },
})

export default ButtonSearch
