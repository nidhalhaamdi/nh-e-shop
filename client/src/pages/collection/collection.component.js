import React from "react";
import { useSelector } from "react-redux";
// import { connect } from "react-redux";

import { useParams } from "react-router-dom";

import CollectionItem from "../../components/collection-item/collection-item.component";

import { selectCollection } from "../../redux/shop/shop.selectors";

import { 
    CollectionPageContainer,
    CollectionTitleContainer,
    CollectionItemsContainer 
} from './collection.styles'; 

const CollectionPage = () => {
    const params = useParams();
    const collection = useSelector(selectCollection(params.collectionId));
    // selectCollection() is a selector that is expecting some collectionId so it can use that
    // and pull it off the collections inside of Redux State
    const { title, items } = collection;
    return(
        <CollectionPageContainer>
            <CollectionTitleContainer>{title}</CollectionTitleContainer>
            <CollectionItemsContainer>
                {
                    items.map(item => (
                        <CollectionItem key={item.id} item={item} />
                    ))
                }
            </CollectionItemsContainer>
        </CollectionPageContainer>
    ) 
};   

export default CollectionPage;

// const mapStateToProps = (state, ownProps) => ({
//     collection: selectCollection(ownProps.match.params.collectionId)(state)
// });

// export default connect(mapStateToProps)(CollectionPage);