import * as React from "react"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FileUploadProps {
  value?: string
  onChange: (file: File | null, dataUrl: string) => void
  accept?: string
  maxSize?: number // in MB
  className?: string
  placeholder?: string
}

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  ({ 
    value, 
    onChange, 
    accept = "image/*", 
    maxSize = 5, 
    className, 
    placeholder = "Cliquez pour télécharger une image ou glissez-déposez"
  }, ref) => {
    const [isDragOver, setIsDragOver] = React.useState(false)
    const [preview, setPreview] = React.useState<string>(value || "")
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const handleFileSelect = (file: File) => {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`Le fichier est trop volumineux. Taille maximale: ${maxSize}MB`)
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        setPreview(dataUrl)
        onChange(file, dataUrl)
      }
      reader.readAsDataURL(file)
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      
      const files = Array.from(e.dataTransfer.files)
      const imageFile = files.find(file => file.type.startsWith('image/'))
      
      if (imageFile) {
        handleFileSelect(imageFile)
      }
    }

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
    }

    const handleClick = () => {
      fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFileSelect(file)
      }
    }

    const clearFile = () => {
      setPreview("")
      onChange(null, "")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }

    React.useEffect(() => {
      setPreview(value || "")
    }, [value])

    return (
      <div ref={ref} className={cn("w-full", className)}>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        
        {preview ? (
          <div className="relative">
            <div className="relative w-full h-48 border rounded-lg overflow-hidden">
              <img 
                src={preview} 
                alt="Aperçu"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleClick}
                  >
                    <Upload className="h-4 w-4 mr-1" />
                    Changer
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={clearFile}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Supprimer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={cn(
              "relative w-full h-48 border-2 border-dashed rounded-lg transition-colors cursor-pointer",
              isDragOver 
                ? "border-primary bg-primary/5" 
                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleClick}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors",
                isDragOver ? "bg-primary/10" : "bg-muted"
              )}>
                <Upload className={cn(
                  "h-6 w-6 transition-colors",
                  isDragOver ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              
              <p className={cn(
                "text-sm font-medium mb-1 transition-colors",
                isDragOver ? "text-primary" : "text-foreground"
              )}>
                {isDragOver ? "Déposez votre image ici" : placeholder}
              </p>
              
              <p className="text-xs text-muted-foreground">
                PNG, JPG, JPEG jusqu'à {maxSize}MB
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }
)

FileUpload.displayName = "FileUpload"

export default FileUpload