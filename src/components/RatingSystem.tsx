
import React, { useState } from 'react';
import { Star, MessageCircle } from 'lucide-react';

interface RatingSystemProps {
  pizzaId: string;
  pizzaName: string;
  onRatingSubmitted?: (rating: number, comment: string) => void;
}

const RatingSystem = ({ pizzaId, pizzaName, onRatingSubmitted }: RatingSystemProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
    if (starRating >= 4) {
      setShowCommentBox(true);
    }
  };

  const handleSubmit = () => {
    if (rating > 0) {
      onRatingSubmitted?.(rating, comment);
      setSubmitted(true);
      
      // Simular salvamento
      setTimeout(() => {
        setSubmitted(false);
        setRating(0);
        setComment('');
        setShowCommentBox(false);
      }, 2000);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
        <div className="text-green-600 font-medium">Obrigado pela sua avaliação!</div>
        <div className="text-green-500 text-sm mt-1">Sua opinião nos ajuda a melhorar</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <h3 className="font-semibold mb-3">Avalie: {pizzaName}</h3>
      
      <div className="flex items-center space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="transition-colors"
          >
            <Star
              className={`w-8 h-8 ${
                star <= (hoveredRating || rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
        {rating > 0 && (
          <span className="ml-2 text-sm text-gray-600">
            ({rating} estrela{rating !== 1 ? 's' : ''})
          </span>
        )}
      </div>

      {showCommentBox && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MessageCircle className="w-4 h-4 inline mr-1" />
              Conte-nos mais sobre sua experiência:
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="O que você achou da pizza? (opcional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              rows={3}
            />
          </div>
        </div>
      )}

      {rating > 0 && (
        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors font-medium"
        >
          Enviar Avaliação
        </button>
      )}
    </div>
  );
};

export default RatingSystem;
