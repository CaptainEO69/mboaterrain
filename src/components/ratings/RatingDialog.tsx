
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

interface RatingDialogProps {
  sellerId: string;
}

export function RatingDialog({ sellerId }: RatingDialogProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const { user } = useAuth();

  const handleSubmitRating = async () => {
    if (!user) {
      toast.error("Vous devez être connecté pour laisser une évaluation");
      return;
    }

    try {
      setIsSubmitting(true);

      const { error } = await supabase
        .from('ratings')
        .insert({
          reviewer_id: user.id,
          seller_id: sellerId,
          rating,
          comment
        });

      if (error) throw error;

      toast.success("Évaluation envoyée avec succès");
      setRating(0);
      setComment("");
    } catch (error: any) {
      console.error('Error submitting rating:', error);
      if (error.code === '23505') {
        toast.error("Vous avez déjà évalué ce vendeur");
      } else {
        toast.error("Erreur lors de l'envoi de l'évaluation");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Star className="w-4 h-4 mr-2" />
          Évaluer le vendeur
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Évaluer le vendeur</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <Star
                key={value}
                className={`w-8 h-8 cursor-pointer transition-colors ${
                  value <= (hoverRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
              />
            ))}
          </div>
          <Textarea
            placeholder="Laissez un commentaire (optionnel)..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />
          <Button
            onClick={handleSubmitRating}
            className="w-full bg-cmr-green hover:bg-cmr-green/90"
            disabled={isSubmitting || rating === 0}
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
