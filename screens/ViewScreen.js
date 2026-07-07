import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  FlatList,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
const image = require('../assets/Unknown.jpg');

const TMDB_API_KEY = '3f40b2f4a03f760da9b434d6b8ddf3e4';

const ViewScreen = () => {
  const [postList, setPostList] = useState([]);

  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const [isListEnd, setIsListEnd] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);


  const fetchData = async (pageNumber) => {
    try {
      setErrorMessage(null);

      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc`
      );
      const data = await response.json();

      if (data.success === false) {
        console.log('API Error:', data.status_message);
        setErrorMessage(data.status_message || 'An error occurred while fetching data');
        return;
      }

      const newResults = data.results || [];

      if (newResults.length === 0 || pageNumber >= data.total_pages) {
        setIsListEnd(true);
      }

      setPostList((prevList) => {
        if (pageNumber === 1) {
          return newResults;
        }
        return [...prevList, ...newResults];
      });
    } catch (error) {
      console.log('Error:', error);
      setErrorMessage('Unable to connect to the internet');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  useEffect(() => {
    if (page === 1) return; 
    setIsLoadingMore(true);
    fetchData(page);
  }, [page]);

  const handleLoadMore = () => {
    if (!isLoadingMore && !isLoading && !isListEnd) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setIsListEnd(false);
    setPage(1);
    await fetchData(1);
  };

  const renderFooter = () => {
    if (isLoadingMore) {
      return (
        <View style={styles.footerContainer}>
          <ActivityIndicator size="small" color="#0000ff" />
          <Text style={styles.footerText}>Loading more...</Text>
        </View>
      );
    }
    if (isListEnd && postList.length > 0) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>No more movies available</Text>
        </View>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading ...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaProvider>
      <ImageBackground source={image} resizeMode="cover" style={styles.background}>
        <SafeAreaView style={styles.container}>
          <View style={styles.listCountiner}>
            {errorMessage && postList.length === 0 && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            )}

            <FlatList
              data={postList}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              renderItem={({item}) => (
                <View style={styles.card}>
                  <Text style={styles.titleText}>{item.title}</Text>
                  <Text style={styles.bodyText}>{item.overview}</Text>
                </View>
              )}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.9}
              ListFooterComponent={renderFooter}
              ListEmptyComponent={<Text>No movies found</Text>}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: StatusBar.currentHeight,
  },
  listCountiner: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 16,
    color: '#666666',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    marginTop: 6,
    color: '#666666',
    fontSize: 13,
  },
  errorContainer: {
    padding: 12,
    backgroundColor: '#ffe0e0',
    borderRadius: 8,
    marginBottom: 8,
  },
  errorText: {
    color: '#cc0000',
    textAlign: 'center',
  },
});

export default ViewScreen;

// import React, {useState , useEffect} from 'react';
// import {
//   View,
//   Text,
// //   Button,
// //   TextInput,
//  ImageBackground,
//   StyleSheet,
// ScrollView,
// // TouchableOpacity,
// ActivityIndicator,
// StatusBar,
// SectionList,
// FlatList
// } from 'react-native';
// import {SafeAreaView,SafeAreaProvider} from 'react-native-safe-area-context';
// // import {observer} from 'mobx-react-lite';

// import useStores from '../hooks/useStores';
// const image = require('../assets/Unknown.jpg');

// //  const DATA = [
// //   {
// //     title: 'tech ',
// //     data: ['Hessa', 'Renad', 'Raghad', 'Safaa'],
// //   },
// //   {
// //     title: 'Marketing',
// //     data: ['Wafaa', 'Rawabi'],
// //   },
// //   {
// //     title: 'Sales',
// //     data: ['Rafaa'],
// //   },
// //   {
// //     title: 'Operations',
// //     data: ['Layan', 'Jalo'],
// //   },
// // ];


// const ViewScreen = () => (
//     const [postList, setPostList] = useState([]);

//   const fetchData = async () => {
//     // ⚠️ لاحظي: كنتِ مستخدمة quotes عادية '...' مو backticks `...`
//     // فـ ${limit} ما كان راح يشتغل كـ template literal، وأصلاً limit مو معرّفة
//     const response = await fetch(
//       'https://jsonplaceholder.typicode.com/posts?_limit=10'
//     );
//     const data = await response.json();
//     setPostList(data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

  
//   <SafeAreaProvider>

//  <ImageBackground source={image} resizeMode="cover" style={styles.background}>
// {/*     
//     <SafeAreaView style={styles.container} edges={['top']}>
//       <SectionList
//         sections={DATA}
//         keyExtractor={(item, index) => item + index}
//         renderItem={({item}) => (
//           <View style={styles.item}>
//             <Text style={styles.title}>{item}</Text>
//           </View>
//         )}
//         renderSectionHeader={({section: {title}}) => (
//           <Text style={styles.header}>{title}</Text>
//         )}
       
//       />
//     </SafeAreaView> */}
    

// <SafeAreaView style={styles.container}>
//           <View style={styles.listCountiner}>
//             <FlatList
//               data={postList}
//               keyExtractor={(item) => item.id.toString()}
//               renderItem={({ item }) => (
//                 <View style={styles.card}>
//                   <Text style={styles.titleText}>{item.title}</Text>
//                   <Text style={styles.bodyText}>{item.body}</Text>
//                 </View>
//               )}
//             />
//           </View>
//         </SafeAreaView>
//       </ImageBackground>
//     </SafeAreaProvider>
//   );
// };
   

// const styles = StyleSheet.create({
//      background: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   container: {
//     flex: 1,
//     backgroundColor:'#f5f5f5' ,
//     paddingTop: StatusBar.currentHeight
//   },
//   listCountiner:{
//     flex : 1,
//     paddingHorizontal :16
//   },
//   card :{
//     backgroundColor : 'white',
//     padding : 10 ,
//     borderRadius : 8,
//     borderWidth:1
//   },
//   titleText:{
//   fontSize:30
//   },
//   bodyText :{
//     fontSize :24,
//     color :'666666'
//   }

// //   item: {
// //     backgroundColor: '#e7b4ed',
// //     padding: 20,
// //     marginVertical: 8,
// //     borderRadius:20
// //   },
// //   header: {
// //     fontSize: 32,
// //     backgroundColor: '#fff',
// //     borderRadius:20



// //   },
// //   title: {
// //     fontSize: 24,
// //   },
// });

// // export default function ViewScreen(){
// //     const [people,setPeople]=useState([
// //         {name : 'Hessa',key :'1'}, 
// //         {name : 'Renad',key :'2'},
// //         {name : 'Layan',key :'3'},
// //         {name : 'Wafa',key :'4'},
// //         {name : 'Raghad',key :'5'},
// //         {name : 'Safa',key :'6'},
// //         {name : 'Haneen',key :'7'},
// //         {name : 'Malak',key :'8'}, 
// //         {name : 'Lana',key :'9'},
// //         {name : 'Hala',key:'10'},
// //         {name : 'Maria',key:'11'},
// //         {name : 'Moana', key:'12'},
// //         {name : 'Salma',key :'13'},
// //         {name : 'Pola',key :'14'},

// //     ]);
// //     const pressHandler = (id) => {
// //         console.log(id);
// //         // setPeople((prevPeople)=>{
// //         // return prevPeople.filter(person=> person.id !=id)
// // // })
//     // }


//     // return(
//     //     <View style={styles.container}>
           
//     //         <FlatList
//     //         keyExtractor={(item)=>item.id}
//     //         data={people}
//     //         renderItem={({item})=> (
//     //             <TouchableOpacity onPress={()=> pressHandler(item.id)}>
//     //                  <Text style ={styles.item}>{item.name}</Text>
//     //             </TouchableOpacity>
       
//     //         )}
//             // />
//             // <ScrollView>
//             // {people.map((item)=>{
//             //     return (
//             //         <View key={item.key}> 
//             //         <Text style ={styles.item}>{item.name}</Text>
//             //         </View>
//             //     )
//             // })}
//             //    </ScrollView> 
     
     
 
// // }

//     // container:{
//     //     flex:1,
//     //     backgroundColor: '#fff',
//     //     paddingTop:40,
//     //     paddingHorizontal:20
//     // },
//     // item:{ 
//     //     marginTop: 24,
//     //     padding :30,
//     //     backgroundColor:'pink',
//     //     fontSize:24,
//     //     marginHorizontal:24
        

//     // },
// export default ViewScreen;

 
