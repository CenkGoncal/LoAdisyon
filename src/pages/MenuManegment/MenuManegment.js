import React, {useState} from 'react';
import {View, Text, Dimensions} from 'react-native';

import IconButton from '../../companent/FormElement/IconButton';
import CategoryModal from '../../companent/Modal/CategoryModal/CategoryModal';
import MenuManegmentTab from '../../companent/Tabs/MenuManegmentTab/MenuManegmentTab';
import colors from '../../styles/colors';
import Styles from './Style';
import CategoryList from '../../companent/List/CategoryList/CategoryList';
import ProductModal from '../../companent/Modal/ProductModal/ProductModal';
import ProductList from '../../companent/List/ProductList/ProductList';
import {UpdateCategory, AddCategory, RemoveCategory, AddProduct, UpdateProduct,RemoveProduct} from './menuFuncLib';
import toast from '../../utilities/toast';


const MenuManagement = () => {
  const tabs = [
    {Text: 'Kategori', Id: 'Category'},
    {Text: 'Ürünler', Id: 'Product'},
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].Id);
  const [isModalCategoryVisible, setModalCategoryVisible] = useState(false);
  const [isModalProductVisible, setModalProductVisible] = useState(false);
  const [selectedCategory, setselectedCategory] = useState(null);
  const [selectedProduct, setselectedProduct] = useState(null);


  const modalOpen = () => {
    if(activeTab == "Category")
    {
      setselectedCategory(null);
      setModalCategoryVisible(true);
    }
    else
    {
      setselectedProduct(null);
      setModalProductVisible(true);
    }
  };

  const SaveCategory = values => {
    if (values.id != "") {
      UpdateCategory(values,()=>{
        handleFinish();
        setselectedCategory(null);
        toast.success({message:'Kategori Güncellendi'});
      })
    } 
    else 
    {
      AddCategory(values,()=>{
        handleFinish();
        toast.success({message:'Kategori Kaydedildi'});
      })
    }
  };


  const handleFinish = () => {
    if(activeTab == "Category")
      setModalCategoryVisible(false);
    else
      setModalProductVisible(false);
  };

  const editCategory = item => {
    setselectedCategory(item);
    setModalCategoryVisible(true);
  };

  const SaveProduct = values => {

    if (values.id != "") {
      UpdateProduct(values,()=>{
        handleFinish();
        setselectedCategory(null);
        toast.success({message:"Kategori Güncellendi"});
      })
    } 
    else 
    {
      AddProduct(values,()=>{
        handleFinish();
        toast.success({message:"Ürün Kaydedildi"});
      });
    }
  }

  const editProduct = item => {
    setselectedProduct(item);
    setModalProductVisible(true);
  };

  return (
    <View style={Styles.container}>
      <MenuManegmentTab
        tabs={tabs}
        OnChangeTab={setActiveTab}
        activeTab={activeTab}>
        {activeTab == tabs[0].Id && (
          <View style={Styles.tabView}>
            <CategoryList onRemove={()=>RemoveCategory(item,()=>{ toast.success({message:'Kategori Silindi'});  })} 
                          onEdit={editCategory} />
            <CategoryModal
              isVisible={isModalCategoryVisible}
              onClose={handleFinish}
              onSend={SaveCategory}
              item={selectedCategory}
            />
          </View>
        )}
        {activeTab == tabs[1].Id && (
          <View style={Styles.tabView}>
            <ProductList onRemove={()=> RemoveProduct(item,()=>{ toast.success({message:'Ürün Silindi'}); })} 
                         onEdit={editProduct} />
            <ProductModal
              isVisible={isModalProductVisible}
              onClose={handleFinish}
              onSend={SaveProduct}
              item={selectedProduct}
            />
          </View>
        )}
      </MenuManegmentTab>
      <IconButton
        icon={{name: 'plus', size: 40, textColor: colors.white}}
        style={Styles.circleButton}
        handlePress={modalOpen}
        iconType={'IconMaterial'}
      />
     
    </View>
  );
};

export default MenuManagement;
