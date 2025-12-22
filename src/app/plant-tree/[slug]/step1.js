"use client";

import OptimizedImage from "@/app/components/OptimizedImage";

// step 1 component
export default function Step1(props) {
  //  const [active, setActive] = useState()
  const { giftStatus, setGiftStatus } = props;
  return (
    <>
      <div className="plant_cover_box">
        <div
          className={`plant_treeType typeLeft ${
            giftStatus == 2 ? "active" : ""
          }`}
          onClick={() => {
            setGiftStatus(2);
          }}
        >
          <div className="plant_treetype_img">
            <OptimizedImage src="/images/gift-tree.png" alt="buy tree" fill />
          </div>
          <div className="plant_treetype_txt">
            <div className="plant_tree_circle">
              <span></span>
            </div>
            <div className="plant_treetype_txt1">
              <p>It&#39;s a Gift</p>
              <span>
                {" "}
                Gift trees to your family and friends. It&#39;s a gift for a
                better future
              </span>
            </div>
          </div>
        </div>
        <div
          className={`plant_treeType typeRight ${
            giftStatus == 1 ? "active" : ""
          }`}
          onClick={() => {
            setGiftStatus(1);
          }}
        >
          <div className="plant_treetype_img">
            <OptimizedImage src="/images/myself-tree.png" alt="buy tree" fill />
          </div>
          <div className="plant_treetype_txt">
            <div className="plant_tree_circle">
              <span></span>
            </div>
            <div className="plant_treetype_txt1">
              <p>It&#39;s for Myself</p>
              <span>
                {" "}
                Plant a tree. It&#39;s for your greener and better future{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
