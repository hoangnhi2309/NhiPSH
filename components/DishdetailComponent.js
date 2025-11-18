import React, { Component } from 'react';
import { View, Text, FlatList, Modal, StyleSheet } from 'react-native'; 
import { Card, Image, Icon, Rating, Input, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-virtualized-view';
import { baseUrl } from '../shared/baseUrl';

// redux
import { connect } from 'react-redux';
import { postFavorite, postComment } from '../redux/ActionCreators'; // Thêm postComment

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)) // Task 2
});

// ------------------------------------------------------------------
// RENDERDISH COMPONENT
// ------------------------------------------------------------------
class RenderDish extends Component {
  render() {
    const dish = this.props.dish;
    if (dish != null) {
      return (
        <Card>
          {/* Cấu trúc Card.Image để tránh lỗi text string và hiển thị FeaturedTitle */}
          <Card.Image 
            source={{ uri: baseUrl + dish.image }} 
            style={{ width: '100%', height: 100 }}
            featuredTitle={dish.name}
          />

          <Text style={{ margin: 10 }}>{dish.description}</Text>
          
          {/* Icons: Đã chỉnh sửa để nhỏ gọn hơn */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}> 
            
            {/* Icon Yêu thích */}
            <Icon reverse size={24} 
              containerStyle={{ marginHorizontal: 15 }} 
              type='font-awesome' 
              color='#f50'
              name={this.props.favorite ? 'heart' : 'heart-o'}
              onPress={() => this.props.favorite ? alert('Already favorite') : this.props.onPressFavorite()} />
            
            {/* Icon Bút chì - Mở Modal (Task 1) */}
            <Icon reverse size={24} 
              containerStyle={{ marginHorizontal: 15 }}
              type='font-awesome' 
              color='#512DA8'
              name='pencil'
              onPress={() => this.props.onPressComment()} />
          </View>
        </Card>
      );
    }
    return (<View />);
  }
}

// ------------------------------------------------------------------
// RENDERCOMMENTS COMPONENT
// ------------------------------------------------------------------
class RenderComments extends Component {
    
    // Phương thức tạo Icons sao (để hiển thị sao tô màu và không tô màu)
    generateStars(rating) {
        const starIcons = [];
        const maxStars = 5;

        for (let i = 1; i <= maxStars; i++) {
            starIcons.push(
                <Icon
                    key={i}
                    type='font-awesome'
                    name={i <= rating ? 'star' : 'star-o'} 
                    size={12} 
                    color='#FFD700' // Màu vàng
                    containerStyle={{ marginHorizontal: 1 }}
                />
            );
        }
        return starIcons;
    }

    render() {
        return (
            <Card>
                <Card.Title>Comments</Card.Title>
                <Card.Divider />
                <FlatList data={this.props.comments}
                    renderItem={({ item, index }) => this.renderCommentItem(item, index)}
                    keyExtractor={(item) => item.id.toString()} />
            </Card>
        );
    }
    
    renderCommentItem(item, index) {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                
                {/* Hiển thị Rating bằng Icons sao */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {this.generateStars(item.rating)} 
                </View>
                
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
}

// ------------------------------------------------------------------
// DISHDETAIL COMPONENT
// ------------------------------------------------------------------
class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // State cho Modal và Form (Task 1)
      showModal: false,
      rating: 5,
      author: '',
      comment: ''
    };
    this.markFavorite = this.markFavorite.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  // Hàm chuyển đổi trạng thái hiển thị Modal
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  // Hàm reset form và đóng Modal
  resetForm() {
      this.setState({
          showModal: false,
          rating: 5,
          author: '',
          comment: ''
      });
  }

  // Hàm xử lý gửi form (Task 1 & Task 2)
  handleComment(dishId) {
      const { rating, author, comment } = this.state;
      this.props.postComment(dishId, rating, author, comment);
      this.resetForm();
  }

  // Hàm hiển thị Modal và Form (Task 1)
  renderCommentForm() {
      return (
          <Modal
              animationType={"slide"}
              transparent={false}
              visible={this.state.showModal}
              onDismiss={() => this.resetForm()}
              onRequestClose={() => this.resetForm()}
          >
              <View style={styles.modal}>
                  {/* Trường 1: Rating (1-5, step 1) */}
                  <Rating
                      showRating
                      onFinishRating={(rating) => this.setState({ rating: rating })}
                      style={{ paddingVertical: 10 }}
                      startingValue={this.state.rating}
                      minValue={1}
                      imageSize={30}
                      fractions={0}
                  />

                  {/* Trường 2: Author (RNE Input) */}
                  <Input
                      placeholder='Author'
                      leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                      onChangeText={(author) => this.setState({ author: author })}
                      value={this.state.author}
                      containerStyle={styles.formInput}
                  />

                  {/* Trường 3: Comment (RNE Input) */}
                  <Input
                      placeholder='Comment'
                      leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                      onChangeText={(comment) => this.setState({ comment: comment })}
                      value={this.state.comment}
                      containerStyle={styles.formInput}
                      multiline={true}
                  />

                  {/* Nút Gửi */}
                  <View style={styles.formRow}>
                      <Button
                          onPress={() => this.handleComment(parseInt(this.props.route.params.dishId))}
                          color="#512DA8"
                          title="SUBMIT"
                      />
                  </View>
                  
                  {/* Nút Hủy */}
                  <View style={styles.formRow}>
                      <Button
                          onPress={() => this.resetForm()}
                          color="#6c757d"
                          title="CANCEL"
                      />
                  </View>
              </View>
          </Modal>
      );
  }

  render() {
    const dishId = parseInt(this.props.route.params.dishId);
    const dish = this.props.dishes.dishes[dishId];
    const comments = this.props.comments.comments.filter((cmt) => cmt.dishId === dishId);
    const favorite = this.props.favorites.some((el) => el === dishId);
    return (
      <ScrollView>
        <RenderDish 
          dish={dish} 
          favorite={favorite} 
          onPressFavorite={() => this.markFavorite(dishId)} 
          onPressComment={() => this.toggleModal()} 
        />
        <RenderComments comments={comments} />
        {this.renderCommentForm()} 
      </ScrollView>
    );
  }
  
  markFavorite(dishId) {
      this.props.postFavorite(dishId);
  }
}

// ------------------------------------------------------------------
// STYLES
// ------------------------------------------------------------------
const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 20,
        marginTop: 50
    },
    formRow: {
        margin: 10
    },
    formInput: {
        margin: 0
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);