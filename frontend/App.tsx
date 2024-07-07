// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, Image, StyleSheet, TextInput } from 'react-native';

// const API_KEY = '44821018-93e75c8aff2c8fdf2c54b6043';

// const App = () => {
  // const [images, setImages] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [query, setQuery] = useState('');

  // useEffect(() => {
  //   fetchImages();
  // }, []);

  // const fetchImages = async (searchQuery = '') => {
  //   try {
  //     setLoading(true);
  //     const apiUrl = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(searchQuery)}`;
  //     const response = await fetch(apiUrl);
  //     const data = await response.json();
  //     setImages(data.hits);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //     setLoading(false);
  //   }
  // };

  // const handleSearch = () => {
  //   fetchImages(query);
  // };

  // const renderItem = ({ item }) => (
  //   <View style={styles.item}>
  //     <Image source={{ uri: item.previewURL }} style={styles.image} />
     
  //   </View>
  // );

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchBar}
//         placeholder="Search for images..."
//         value={query}
        // onChangeText={(text) => setQuery(text)}
        // onSubmitEditing={handleSearch}
//       />
      // {loading ? (
      //   <Text>Loading...</Text>
      // ) : (
      //   <FlatList
      //     data={images}
      //     keyExtractor={(item) => item.id.toString()}
      //     renderItem={renderItem}
      //   />
      // )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 20,
//   },
//   searchBar: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
  // item: {
  //   marginBottom: 20,
  //   alignItems: 'center',
  // },
  // image: {
  //   width: 150,
  //   height: 150,
  // },
// });

// export default App;


import { View, Text } from 'react-native';
import React from 'react';
import ButtonSearch from './component/ButtonSearch';


const App = () => {
  return (
    <View style={{ marginTop: 60 }}>
      <Text style={{ fontSize: 30, padding: 10, backgroundColor: "#e6e6fa" }}>Pixels</Text>
    
      <ButtonSearch />
    </View>
  );
};

export default App;
