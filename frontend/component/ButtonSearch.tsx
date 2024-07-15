import { View, Text, Image, StyleSheet, ScrollView, TouchableHighlight, ActivityIndicator } from 'react-native'
import React from 'react'
import {Searchbar } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { API_KEY } from '../../../API/APi';
import { MasonryFlashList } from "@shopify/flash-list";
import { getColumnCount, wp } from './Common';
import ImageCard from './ImageCard'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ButtonSearch = () => {
  const categories = [
    'backgrounds', 'fashion', 'nature', 'science', 'education', 'feelings', 'health',
    'people', 'religion', 'places', 'animals', 'industry', 'computer', 'food',
    'sports', 'transportation', 'travel', 'buildings', 'business', 'music'
  ];

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1)
   const navigation = useNavigation();

  const fetchImages = async (searchQuery = '') => {
    try {
      setLoading(true);
      axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(searchQuery)}&page=${currentPage}`)
      .then(res=>{
        setImages(res.data.hits);
        setLoading(false);
      })
      
     
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);


  const handleSearch = () => {
    fetchImages(query);
  };


  const renderLoader = () => {
    return (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size={60} color="#aaa"
        />
      </View>
    )
  }

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
    // console.log("end agya");
  }

  const columns = getColumnCount();
  return (
    <>

      <ScrollView style={{ marginBottom: 0 }} >

       

        <View style={styles.container}>
        {/* <View style={styles.header}>
          <Text style={styles.Pixles} onPress={navigation.navigate("Profile")}>Pixles</Text>
         <View style={styles.round} >
         <Image style={styles.iconImage}  source={{uri:"https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"}}/>
         </View>
        </View> */}
          <Searchbar
            placeholder="Search for photo"
            value={query}
            onChangeText={(text) => setQuery(text)}
            onSubmitEditing={handleSearch}/>

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
          <Text style={{ fontSize: 20, }}>Loading...</Text>
        ) : (

          <View style={styles.data}>
            <MasonryFlashList
              data={images}
              numColumns={2}

              contentContainerStyle={styles.listContainerStyles}
              renderItem={({ item, index }) => <ImageCard item={item} index={index} columns={columns} />}
              estimatedItemSize={200}
              ListFooterComponent={renderLoader}
              onEndReached={loadMoreItem}
              onEndReachedThreshold={0}
            />
          </View>

        )}

      </ScrollView>
    </>
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
    backgroundColor: "white",
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
  listContainerStyles: {
    paddingHorizontal: wp(4),
  },
  data: {
    minHeight: 3,
    width: wp(100)
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
  header:{
    flexDirection:"row",
    justifyContent:"space-between",
    padding:10,
  },
  Pixles:{
    fontSize:25,
    marginTop:20,
  },
  round:{
    borderColor:"balck",
    borderWidth:4,
    borderRadius:50,
   
  },
  iconImage:{
    width:80,
    height:80,
  
   
  }
})

export default ButtonSearch
