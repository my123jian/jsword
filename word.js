(function(){

    var theDictList=[{word:'广东'},{word:'广西'},{word:'浙江'},{word:'江苏'},{word:'北京'},{word:'重庆'}];

    function dictItem() {
        this.word="";
        this.rate=1;
    }

    /**
     * find the new items begin with theChar
     * @param theDicts
     * @param theChar
     * @returns {Array}
     */
    function findStartWords(theDicts,theChar) {
        var theResult=[];
        for(var i=0;i<theDicts.length;i++){
            var theDictItem=theDicts[i];
            if(theDictItem.word[0]==theChar){
                theResult.push(theDictItem);
            }
        }
        return theResult;
    }

    /**
     * find the similar words at thePosition
     * @param theDicts
     * @param theChar
     * @param thePosition
     * @returns {Array}
     */
    function  findSimilarWords(theDicts,theChar,thePosition) {
        var theResult=[];
        var theFininshItem=null;
        for(var i=0;i<theDicts.length;i++){
            var theDictItem=theDicts[i];
            if(theDictItem.word.length<=thePosition){
                if(theFininshItem==null||theFininshItem.word.length<theDictItem.word.length){
                    //find one and break
                    theFininshItem=theDictItem;
                    break;
                }
                continue;
            }
            if(theDictItem.word[thePosition]==theChar){
                theResult.push(theDictItem);
            }
        }
        if(theFininshItem!=null&&theResult.length<=0){
            theResult.push(theFininshItem);
        }
        return theResult;
    }

    
    /***
     * make string to words
     * @returns {Array}
     */
    String.prototype.toWords=function () {
        var theWords=[];
        var theCurrentDicts=[];
        var thePosition=0;
        for(var i=0;i<this.length;i++){
            var theChar=this[i];
            if(theCurrentDicts.length>0){
                theCurrentDicts=findSimilarWords(theCurrentDicts,theChar,thePosition);
                if(theCurrentDicts.length>0){
                    if(theCurrentDicts.length==1&&theCurrentDicts[0].word.length<=thePosition+1){
                        theWords.push(theCurrentDicts[0]);
                        theCurrentDicts=[];
                        thePosition=0;
                    }
                    thePosition=thePosition+1;
                    continue;
                }
            }
            theCurrentDicts=findStartWords(theDictList,theChar);
            thePosition=1;
        }
        if(theCurrentDicts.length==1&&theCurrentDicts[0].word.length<=thePosition+1){
            theWords.push(theCurrentDicts[0]);

        }
        return theWords;
    }    
    
})();

