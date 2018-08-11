import { WordCloud } from "@hpcc-js/chart";

new WordCloud()
    .target("target")
    .columns(["Word", "Count"])
    .data(createData())
    .render()
    ;

function createData() {
    var common = "poop,i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall";
    var text_string = "How the Word Cloud Generator Works The layout algorithm for positioning words without overlap is available on GitHub under an open source license as d3-cloud. Note that this is the only the layout algorithm and any code for converting text into words and rendering the final output requires additional development.  As word placement can be quite slow for more than a few hundred words, the layout algorithm can be run asynchronously, with a configurable time step size. This makes it possible to animate words as they are placed without stuttering. It is recommended to always use a time step even without animations as it prevents the browser’s event loop from blocking while placing the words.  The layout algorithm itself is incredibly simple. For each word, starting with the most “important”:  Attempt to place the word at some starting point: usually near the middle, or somewhere on a central horizontal line.  If the word intersects with any previously placed words, move it one step along an increasing spiral. Repeat until no intersections are found.  The hard part is making it perform efficiently! According to Jonathan Feinberg, Wordle uses a combination of hierarchical bounding boxes and quadtrees to achieve reasonable speeds.  Glyphs in JavaScript There isn’t a way to retrieve precise glyph shapes via the DOM, except perhaps for SVG fonts. Instead, we draw each word to a hidden canvas element, and retrieve the pixel data.  Retrieving the pixel data separately for each word is expensive, so we draw as many words as possible and then retrieve their pixels in a batch operation.  Sprites and Masks My initial implementation performed collision detection using sprite masks. Once a word is placed, it doesn't move, so we can copy it to the appropriate position in a larger sprite representing the whole placement area.  The advantage of this is that collision detection only involves comparing a candidate sprite with the relevant area of this larger sprite, rather than comparing with each previous word separately.  Somewhat surprisingly, a simple low-level hack made a tremendous difference: when constructing the sprite I compressed blocks of 32 1-bit pixels into 32-bit integers, thus reducing the number of checks (and memory) by 32 times.  In fact, this turned out to beat my hierarchical bounding box with quadtree implementation on everything I tried it on (even very large areas and font sizes). I think this is primarily because the sprite version only needs to perform a single collision test per candidate area, whereas the bounding box version has to compare with every other previously placed word that overlaps slightly with the candidate area.  Another possibility would be to merge a word’s tree with a single large tree once it is placed. I think this operation would be fairly expensive though compared with the analagous sprite mask operation, which is essentially ORing a whole block.";
    var word_count = {};
    var words = text_string.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
    if (words.length == 1) {
        word_count[words[0]] = 1;
    } else {
        words.forEach(function (word) {
            var word = word.toLowerCase();
            if (word != "" && common.indexOf(word) == -1 && word.length > 1) {
                if (word_count[word]) {
                    word_count[word]++;
                } else {
                    word_count[word] = 1;
                }
            }
        })
    }

    const retVal = [];
    for (const key in word_count) {
        if (key) {
            retVal.push([key, word_count[key]]);
        }
    }
    return retVal
}

