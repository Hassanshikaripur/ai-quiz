import React from 'react';
import {
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share';

interface ShareResultsProps {
  score: number;
  total: number;
  topic: string;
}

const ShareResults: React.FC<ShareResultsProps> = ({ score, total, topic }) => {
  const shareUrl = window.location.href;
  const shareTitle = `I scored ${score}/${total} on a quiz about ${topic} using QuizGenius AI! Test your knowledge too!`;

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <p className="text-gray-600">Share your results:</p>
      <div className="flex gap-4">
        <TwitterShareButton url={shareUrl} title={shareTitle}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        
        <LinkedinShareButton url={shareUrl} title={shareTitle}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        
        <WhatsappShareButton url={shareUrl} title={shareTitle}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default ShareResults;